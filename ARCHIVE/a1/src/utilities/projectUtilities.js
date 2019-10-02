//

export function projectsFromGoals(goals) {
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => arr.push(project));
	});
	return arr;
}

export function projectsWithGoalFromGoals(goals) {
	const arr = [];
	goals.forEach(goal => {
		goal.projects.forEach(project => arr.push({ project, goal }));
	});
	return arr;
}

export function projectFromGoalsById(id, goals) {
	const abc = id * 1;
	const arr = projectsFromGoals(goals);
	return arr.find(project => project.projectid === abc);
}
