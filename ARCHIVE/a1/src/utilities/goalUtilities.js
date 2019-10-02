import * as projectUtilities from './projectUtilities';

export function goalFromGoalsById(id, goals) {
	const abc = id * 1;
	return goals.find(goal => goal.goalid === abc);
}

export function goalFromGoalsByProjectId(id, goals) {
	const projects = projectUtilities.projectsWithGoalFromGoals(goals);
	// console.log('goalFromGoalsByProjectId, projects ', projects);
	const goal = projects.find(item => item.project.projectid === id * 1);
	// console.log('goal ', goal);
	return goal;
}
