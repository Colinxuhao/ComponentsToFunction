import myComponentLoaidng from "./loading"; 
const myComponent = {
	// zidinf已定义全局组件
	install:function(Vue){
		
		Vue.component('my-loading',myComponentLoaidng);


		// 1. 添加全局方法或属性
		Vue.myFunctionAlt = function(name){							// 调用时要在页面指定引入 Vue 使用Vue.funcName
			console.log(name,'a')
		};

		// 2. 添加全局资源
		Vue.directive('my-directive', {								// 调用前面要加 v- 
		    bind (el, binding, vnode, oldVnode) {
		      // 逻辑...
		      console.log('n')
		    } 
		});

		// 3. 注入组件
		Vue.mixin({													// 在指定的组件中添加 字段 判断是否让其执行 myOptions:{ run:true }, 
		  created(){ 
		    if(this.$options['myOptions']){
		      console.log('run'); 
		    }

		  }
		});

		// 4. 添加实例方法
		Vue.prototype.$myMethod = function (methodOptions) {
		    // 逻辑...
		    // console.log(methodOptions,'zhe') 
		} 

	}
};

export default myComponent; 