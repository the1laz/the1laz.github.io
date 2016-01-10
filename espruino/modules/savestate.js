exports = {
  store: function() {
    if (typeof this.reset === "undefined") {
      this.reset = reset;
      global.reset = this.softreset.bind(this);
    };
		this.modules = Object.keys(global["\xFF"].modules);
		this.vars = Object.keys(global);
  },
	modules:[],
	vars:[],
	softreset:function() {
		clearInterval();
		clearWatch();
		Object.keys(global["\xFF"].modules).forEach(function(n){
			if(this.modules.indexOf(n) === -1){print("y"+n);delete global["\xFF"].modules[n]}else{print("n"+n)};
		},this);
		Object.keys(global).forEach(function(n){
			if(this.vars.indexOf(n) === -1){print("y"+n);delete global[n]}else{print("n"+n)};
		},this);
	}
}
