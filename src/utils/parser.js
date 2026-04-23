const countryMap = {
  nigeria: "NG",
  kenya: "KE",
  angola: "AO"
};

function parseQuery(q) {
  const text = q.toLowerCase();

  const filters = {};

  // Gender
  if (text.includes("male")) filters.gender = "male";
  if (text.includes("female")) filters.gender = "female";

  // Age keywords
  if (text.includes("young")) {
    filters.min_age = 16;
    filters.max_age = 24;
  }

  if (text.includes("adult")) filters.age_group = "adult";
  if (text.includes("teenager")) filters.age_group = "teenager";

  // Age numbers
  const match = text.match(/above (\d+)/);
  if (match) {
    filters.min_age = Number(match[1]);
  }

  // Country
  for (let country in countryMap) {
    if (text.includes(country)) {
      filters.country_id = countryMap[country];
    }
  }

  if (Object.keys(filters).length === 0) return null;

  return filters;
}

module.exports = parseQuery;