const Profile = require("../models/profile.models");
const parseQuery = require("../utils/parser")

// GET /api/profiles
const getProfiles = async (req, res) => {
  try {
    let {
      gender,
      age_group,
      country_id,
      min_age,
      max_age,
      sort_by = "created_at",
      order = "asc",
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    // Filtering
    if (gender) query.gender = gender;
    if (age_group) query.age_group = age_group;
    if (country_id) query.country_id = country_id;

    if (min_age || max_age) {
      query.age = {};
      if (min_age) query.age.$gte = Number(min_age);
      if (max_age) query.age.$lte = Number(max_age);
    }

    // Sorting
    const sort = {};
    sort[sort_by] = order === "desc" ? -1 : 1;

    // Pagination
    const skip = (page - 1) * limit;

    const data = await Profile.find(query)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Profile.countDocuments(query);

    res.json({
      status: "success",
      page: Number(page),
      limit: Number(limit),
      total,
      data
    });

  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
};


const searchProfile = async (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;

  if (!q) {
    return res.status(400).json({
      status: "error",
      message: "Missing query"
    });
  }

  const filters = parseQuery(q);

  if (!filters) {
    return res.status(422).json({
      status: "error",
      message: "Unable to interpret query"
    });
  }

  const query = {};

  if (filters.gender) query.gender = filters.gender;
  if (filters.age_group) query.age_group = filters.age_group;

  if (filters.min_age || filters.max_age) {
    query.age = {};
    if (filters.min_age) query.age.$gte = filters.min_age;
    if (filters.max_age) query.age.$lte = filters.max_age;
  }

  if (filters.country_id) query.country_id = filters.country_id;

  const skip = (page - 1) * limit;

  const data = await Profile.find(query)
    .skip(skip)
    .limit(Number(limit));

  const total = await Profile.countDocuments(query);

  res.json({
    status: "success",
    page: Number(page),
    limit: Number(limit),
    total,
    data
  });
};

module.exports = {
    getProfiles,
    searchProfile
}