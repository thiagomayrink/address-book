const deploy_URL = "Substituir apos deploy";

const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost/api" // development api
    : `https://${deploy_URL}/api`; // production api

export { apiUrl };
