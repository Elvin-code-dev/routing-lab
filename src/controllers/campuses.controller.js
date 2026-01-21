const campuses = [
  { id: 1, code: "AUB", name: "Auburn Campus", city: "Auburn", open: true, programs: ["CS", "IT", "Nursing"] },
  { id: 2, code: "KCC", name: "Kent Campus", city: "Kent", open: true, programs: ["CS", "Business"] },
  { id: 3, code: "SEA", name: "Seattle Center", city: "Seattle", open: false, programs: ["Continuing Ed"] },
  { id: 4, code: "TAC", name: "Tacoma Site", city: "Tacoma", open: true, programs: ["Trades", "IT"] },
  { id: 5, code: "REN", name: "Renton Annex", city: "Renton", open: false, programs: ["ESL", "GED"] }
];

export const aboutInfo = (req, res) => {
  return res.status(200).json({
    message: "Campus directory routes",
    routes: ["GET /", "GET /about|/info", "GET /:id", "GET /search?city=&open=&program="]
  });
};

export const listCampuses = (req, res) => {
  return res.status(200).json({ campuses });
};

export const getCampusById = (req, res) => {
  const { id } = req.params;
  const campus = campuses.find(c => c.id === Number(id));

  if (campus) {
    return res.status(200).json({ campus });
  } else {
    return res.status(404).json({ error: "Campus not found" });
  }
};

export const searchCampuses = (req, res) => {
  const cityFilter = req.query.city;
  const openFilter = req.query.open;
  const programFilter = req.query.program;

  let results = campuses;

  // filter by city 
  if (cityFilter) {
    results = results.filter(campus => campus.city.toLowerCase() === cityFilter.toLowerCase());
  }

  // filter by open true or false
  if (openFilter) {
    if (openFilter === "true") {
      results = results.filter(campus => campus.open === true);
    } else if (openFilter === "false") {
      results = results.filter(campus => campus.open === false);
    }
  }

  // filter by program 
  if (programFilter) {
    results = results.filter(campus => campus.programs.includes(programFilter));
  }

  return res.status(200).json({ results });
};
