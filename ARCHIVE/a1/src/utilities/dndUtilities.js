//

import { DND_GOAL_TYPE, DND_PROJECT_TYPE, DND_TASK_TYPE } from '../redux/dnd.constants';

export function moveObject(state, before) {
	return {
		from: {
			goalid: state.drag.goalid,
			projectid: state.drag.projectid,
			taskid: state.drag.taskid
		},
		to: {
			goalid: state.over.goalid,
			projectid: state.over.projectid,
			taskid: state.over.taskid
		},
		before
	};
}

export function isOverGoal(goalid, state) {
	if (state.over.type !== DND_GOAL_TYPE) {
		return false;
	}
	if (state.over.counter < 1) {
		return false;
	}
	if (state.over.goalid !== goalid) {
		return false;
	}
	return true;
}

export function isDraggingGoal(goalid, state) {
	if (state.drag.type !== DND_GOAL_TYPE) {
		return false;
	}
	if (state.drag.goalid !== goalid) {
		return false;
	}
	return true;
}

export function isOverProject(goalid, projectid, state) {
	if (state.over.type !== DND_PROJECT_TYPE) {
		return false;
	}
	if (state.over.counter < 1) {
		return false;
	}
	if (state.over.goalid !== goalid) {
		return false;
	}
	if (state.over.projectid !== projectid) {
		return false;
	}
	return true;
}

export function isDraggingProject(goalid, projectid, state) {
	if (state.drag.type !== DND_PROJECT_TYPE) {
		return false;
	}
	if (state.drag.goalid !== goalid) {
		return false;
	}
	if (state.drag.projectid !== projectid) {
		return false;
	}
	return true;
}

export function isOverTask(goalid, projectid, taskid, state) {
	if (state.over.type !== DND_TASK_TYPE) {
		return false;
	}
	if (state.over.counter < 1) {
		return false;
	}
	if (state.over.goalid !== goalid) {
		return false;
	}
	if (state.over.projectid !== projectid) {
		return false;
	}
	if (state.over.taskid !== taskid) {
		return false;
	}
	return true;
}

export function isDraggingTask(goalid, projectid, taskid, state) {
	if (state.drag.type !== DND_TASK_TYPE) {
		return false;
	}
	if (state.drag.goalid !== goalid) {
		return false;
	}
	if (state.drag.projectid !== projectid) {
		return false;
	}
	if (state.drag.taskid !== taskid) {
		return false;
	}
	return true;
}

/*
export function calculateGoalAttr(goal, fct, state, canDrag, canDrop) {
	console.log('calculateGoalAttr; goalid ', goal.goalid);
	const dragged = isDragGoal(state) && state.drag.goalid === goal.goalid;
	const otherDragged = isDragGoal(state) && state.drag.goalid !== goal.goalid;
	const before = isOverGoal(state) && state.over.goalid === goal.goalid;
	const after = before;
	let mayDrag = canDrag;
	let mayDrop = canDrop;
	if (dragged) {
		mayDrop = false;
	}
	if (otherDragged) {
		mayDrag = false;
	}

	const options = {
		dragged,
		before,
		after,
		dndOptions: createAttr(fct, mayDrag, mayDrop)
	};
	return options;
}

export function isValidTargetGoal(target) {
	// console.log('isValidTargetGoal; target ', target);
	const type = target.getAttribute('data_type');
	// console.log('isValidTargetGoal; type ', type);
	return type === 'goal';
}

*/

/*
function createAttr(fct, canDrag, canDrop) {
	const wrap = {};
	if (canDrag) {
		wrap.draggable = true;
		wrap.onDragStart = fct.onDragStart;
		wrap.onDragEnd = fct.onDragEnd;
	} else {
		wrap.draggable = false;
	}
	if (canDrop) {
		wrap.onDragEnter = fct.onDragEnter;
		wrap.onDragLeave = fct.onDragLeave;
		wrap.onDrop = fct.onDrop;
	}
	return wrap;
}

function isDragGoal(state) {
	return !!state.drag.goalid;
}
*/
