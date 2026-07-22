const HOST = "www.floor05.com";
const KEY = "7b38958ec9e5e3e0bc97b5a6be8a93d5";
const SITEMAP_URL = "https://www.floor05.com/sitemap.xml";
const INDEXNOW_URL = "https://api.indexnow.org/indexnow";

function extractUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => match[1]);
}

async function main() {
  const isDryRun = process.argv.includes("--dry-run");

  try {
    const sitemapResponse = await fetch(SITEMAP_URL);

    if (!sitemapResponse.ok) {
      console.warn(`sitemap 요청 실패: ${sitemapResponse.status} ${sitemapResponse.statusText}`);
      return;
    }

    const sitemapXml = await sitemapResponse.text();
    const urlList = extractUrls(sitemapXml);

    if (urlList.length === 0) {
      console.warn("sitemap에서 URL을 찾지 못했습니다.");
      return;
    }

    if (isDryRun) {
      console.log(`dry-run: 추출 URL ${urlList.length}개`);
      console.log(urlList.slice(0, 5).join("\n"));
      return;
    }

    const indexNowResponse = await fetch(INDEXNOW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://www.floor05.com/${KEY}.txt`,
        urlList,
      }),
    });

    if (!indexNowResponse.ok) {
      console.warn(`IndexNow 제출 실패: ${indexNowResponse.status} ${indexNowResponse.statusText}`);
      return;
    }

    console.log(`IndexNow 응답 상태: ${indexNowResponse.status}`);
    console.log(`제출 URL 수: ${urlList.length}`);
  } catch (error) {
    console.warn("IndexNow 처리 중 오류가 발생했습니다.");
    console.warn(error instanceof Error ? error.message : error);
  }
}

main().catch((error) => {
  console.warn("IndexNow 처리 중 오류가 발생했습니다.");
  console.warn(error instanceof Error ? error.message : error);
});
