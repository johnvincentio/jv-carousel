//

export function remainingProperties(props, types) {
	// console.log('---utils::remainingProperties, props ', props, ' types ', types);
	const ret = {};
	Object.entries(props).forEach(([key, value]) => {
		// console.log(`${key} ${value}`);
		if (!types[key]) {
			// console.log('key ', key, ' not found');
			ret[key] = value;
		}
	});
	// console.log('---utils::remainingProperties, ret ', ret);
	return ret;
}

export function initcap(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isDesktop() {
	return window.matchMedia('(max-width: 767px)').matches;
}

export function isMdUp() {
	return window.matchMedia('(min-width: 960px)').matches;
}

export function isCalendarWeekView() {
	return window.matchMedia('(max-width: 650px)').matches;
}

// export function ObjectToArray(obj) {
// 	console.log('--- utils::abc, obj ', obj);
// 	let arr = Object.keys(obj).map((k) => {
// 		console.log('k ', k);
// 		return k;
// 	});
// 	console.log('arr ', arr);
// 	return arr;
// }

// const { arr, ...rem } = this.props;
// console.log('rem ', rem);

// const props = Object.assign({}, this.props);
// const a1 = {}
// const { inputType, ...rem } = this.props;
// console.log('rem ', rem);

// *eslint-disable no-unused-vars

// const myObject = {
// 	a: 1,
// 	b: 2,
// 	c: 3,
// };
// const { a, ...noA } = myObject;
// console.log('noA ', noA);

// export function play1() {
// 	let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
// 	console.log(x); // 1
// 	console.log(y); // 2
// 	console.log(z); // { a: 3, b: 4 }
// }

// export function play2() {
// 	const obj = { x: 'xv', y: 'yv' };
// 	let { { obj }, ...z } = { x: 1, y: 2, a: 3, b: 4 };
// 	console.log(x); // 1
// 	console.log(y); // 2
// 	console.log(z); // { a: 3, b: 4 }
// }
