// Converts workspace name to URL slug: "Acme Corp" → "acme-corp"
const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // remove non-word chars
    .replace(/[\s_-]+/g, '-')  // spaces/underscores to hyphens
    .replace(/^-+|-+$/g, '');  // trim leading/trailing hyphens
};

module.exports = slugify;
