function down(e){
	if(this.setCapture){
		this.setCapture();
		on(this,"mousemove",move);
		on(this,"mouseup",up);
	}else{
		var _this=this;
		this.MOVE=function(e){
			move.call(_this,e)
		};
		this.UP=function(e){
			up.call(_this,e)
		};
	/*	this.MOVE=processThis(this,move);
		this.UP=processThis(this,up);*/
		on(document,"mousemove",this.MOVE);
		on(document,"mouseup",this.UP);

	}
	//按下down的默认行为就是选中文字；假如里面有图片的话，会影响mousemove的默认行为；所以取消down的默认行为；
	e.preventDefault();//阻止事件的默认行为

	selfRun.call(this,"selfdragstart",e);//这一行代码叫“发布”或“通知”//内置E可以不传，因为是clearEffect这个方法里面没有用事件对象E
	
}

function move(e){
	//在drag里不应该实现任何具体的操作，只负责把当前的这个机会暴露出去
	//mousemove和drag的区别
	//drag之前一定要先down，mousemove不会有down
	//drag事件应该是mousedown事件和mousemove事件的组合
	
	selfRun.call(this,"selfdrag",e);//因为getSpeed里面有e所以这个e必须传，假如里面没有就可以不穿
	//这是内置的E
}

function up(e){
	if(this.releaseCapture){
		off(this,"mousemove",move);
		off(this,"mouseup",up);
		this.releaseCapture();
	}else{
		off(document,"mousemove",this.MOVE);
		off(document,"mouseup",this.UP);
	}
	

	selfRun.call(this,"selfdragend",e);
	
}