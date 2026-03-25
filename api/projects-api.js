let data = null;
export async function getProjects() {
  if (data) return data;

  try {
    // Chargement du json de projets
    const res = await fetch("data/projects.json");
    if (!res.ok) throw new Error("Not found");

    data = await res.json();
    return data;
  } catch (error) {
    console.error("Erreur lors du fetch JSON : ", error);
    return null;
  }
}
