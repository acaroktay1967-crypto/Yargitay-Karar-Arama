const path = require("node:path");
const { ingestOpenSourceDecisions } = require("../ingest/openSourceIngest");

function parseArgs(argv) {
  const options = {
    sourceUrls: [],
    query: "",
    outputDir: path.resolve(process.cwd(), "src/data/by-offense"),
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--source" && argv[i + 1]) {
      options.sourceUrls.push(argv[i + 1]);
      i += 1;
    } else if (token === "--query" && argv[i + 1]) {
      options.query = argv[i + 1];
      i += 1;
    } else if (token === "--output" && argv[i + 1]) {
      options.outputDir = path.resolve(process.cwd(), argv[i + 1]);
      i += 1;
    }
  }

  return options;
}

async function run() {
  const options = parseArgs(process.argv.slice(2));
  const result = await ingestOpenSourceDecisions(options);
  console.log(
    JSON.stringify(
      {
        message: "İşlem tamamlandı.",
        ...result,
      },
      null,
      2,
    ),
  );
}

if (require.main === module) {
  run().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}

module.exports = { parseArgs };
