class EventEmitter {
	constructor() {
		this.events = {};
	}
	on(eventName, fn) {
		if(!this.events[eventName]) {
			this.events[eventName] = [];
		}
		this.events[eventName].push(fn);
		return () => {
			this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
		};
	}
	off(eventName, fn) {
		this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
	}
	emit(eventName, data) {
		const event = this.events[eventName];
		if(event) {
			event.forEach(fn => {
				fn.call(null, data);
			});
		}
	}
}

export default EventEmitter;
