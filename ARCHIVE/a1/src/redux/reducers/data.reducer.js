
import { GET_USER_DATA } from '../constants';

const initialState = {
	goals: [{ id: 1, seq: 1, text: 'goal1' }, { id: 2, seq: 2, text: 'goal2' }],
	projects: ['project1', 'project2'],
	data: {
		goals: [
			{
				goal: 'goal1',
				tasks: [{ task: 'task1' }, { task: 'task2' }, { task: 'task3' }]
			},
			{
				goal: 'goal2',
				tasks: [{ task: 'taskA' }, { task: 'taskB' }, { task: 'taskC' }]
			}
		],
		projects: [
			{
				project: 'project1',
				tasks: [{ task: 'pt1' }, { task: 'pt2' }, { task: 'pt3' }]
			}
		]
	}
};

function data(state = initialState, action) {
	switch (action.type) {
		case GET_USER_DATA:
			return Object.assign({}, state);
		default:
			return state;
	}
}

export default data;
