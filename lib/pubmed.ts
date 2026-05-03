import { decode } from "html-entities";

export interface PubMedStudy {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  abstract: string;
  doi?: string;
}

function xmlExtract(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = xml.match(regex);
  return match ? decode(match[1].trim()) : "";
}

function xmlExtractAll(xml: string, tag: string): string[] {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const matches: string[] = [];
  let m;
  while ((m = regex.exec(xml)) !== null) {
    matches.push(decode(m[1].trim()));
  }
  return matches;
}

export async function searchPubMed(
  query: string,
  maxResults: number = 10
): Promise<string[]> {
  const url = new URL("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi");
  url.searchParams.set("db", "pubmed");
  url.searchParams.set("term", query);
  url.searchParams.set("retmax", String(maxResults));
  url.searchParams.set("retmode", "json");
  url.searchParams.set("sort", "relevance");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`PubMed search failed: ${res.status}`);

  const data = await res.json();
  return data.esearchresult?.idlist || [];
}

export async function fetchPubMedStudies(pmids: string[]): Promise<PubMedStudy[]> {
  if (pmids.length === 0) return [];

  const url = new URL("https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi");
  url.searchParams.set("db", "pubmed");
  url.searchParams.set("id", pmids.join(","));
  url.searchParams.set("retmode", "xml");

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`PubMed fetch failed: ${res.status}`);

  const xml = await res.text();
  const articles = xml.split("<PubmedArticle>").slice(1);

  return articles.map((article) => {
    const medline = xmlExtract(article, "MedlineCitation");
    const articleXml = xmlExtract(medline, "Article");

    const title = xmlExtract(articleXml, "ArticleTitle");

    const authorList = xmlExtract(articleXml, "AuthorList");
    const authors = xmlExtractAll(authorList, "LastName")
      .map((last, i) => {
        const initials = xmlExtractAll(authorList, "Initials")[i] || "";
        return `${last} ${initials}`.trim();
      })
      .filter(Boolean)
      .join(", ");

    const journal = xmlExtract(articleXml, "Title");

    const journalIssue = xmlExtract(articleXml, "JournalIssue");
    const pubDate = xmlExtract(journalIssue, "PubDate");
    const year = parseInt(xmlExtract(pubDate, "Year") || xmlExtract(pubDate, "MedlineDate")?.split(" ")[0] || "0", 10);

    const abstractXml = xmlExtract(articleXml, "Abstract");
    const abstract = xmlExtractAll(abstractXml, "AbstractText").join("\n\n");

    const articleIds = xmlExtract(article, "ArticleIdList");
    const doi =
      xmlExtractAll(articleIds, "ArticleId").find((id) =>
        articleIds.includes(`IdType="doi"`) && articleIds.includes(`>${id}<`)
      ) || "";

    return {
      pmid: xmlExtract(medline, "PMID") || "",
      title: title || "Untitled",
      authors: authors || "Unknown",
      journal: journal || "Unknown Journal",
      year: isNaN(year) ? 0 : year,
      abstract: abstract || "No abstract available.",
      doi: doi || undefined,
    };
  });
}

export async function searchAndFetchPubMed(
  query: string,
  maxResults: number = 10
): Promise<PubMedStudy[]> {
  const pmids = await searchPubMed(query, maxResults);
  return fetchPubMedStudies(pmids);
}
