window.onload = function(){
    var oTable = document.getElementById('tab');
    var tHead = oTable.tHead;
    var aCell = tHead.rows[0].cells;
    var tBody = oTable.tBodies[0];
    var aRow = tBody.rows;
    var data = null;

    getData();
    function getData(){
        var xml = new XMLHttpRequest();
        xml.open('get','json/json.json',false);
        xml.onreadystatechange = function(){
            if(xml.readyState == 4 && (/^2\d{2}$/).test(xml.status)){
                var val = xml.responseText;
                data = utils.toJSON(val);
                console.log(data);
            }
        }
        xml.send(null);
    }
    bind();
    function bind(){
        var str = '';
        for(var i = 0;i<data.length;i++){
            data[i].sex = data[i].sex==0?"男":(data[i].sex == 1?"女":"未知");
            str += "<tr>\
                <td>"+data[i].name+"</td>\
                <td>"+data[i].age+"</td>\
                <td>"+data[i].sex+"</td>\
                <td>"+data[i].score+"</td>\
                </tr>";
        }
        tBody.innerHTML += str;
    }
    changeBg();
    function changeBg(){
        var bg = '';
        for(var i=0;i<aRow.length;i++){
            aRow[i].className = 'bg' + (i%3+1);
        }
    }
    function mySort(n){
        var that = this;
        for(var i = 0;i<aCell.length;i++){
            aCell.flag = i!=n?-1:this.flag;
        }
        that.flag *= -1;
        var ary = utils.listToArray(aRow);
        ary.sort(function(a,b){
            var curInn = a.cells[n].innerHTML;
            var nexInn = b.cells[n].innerHTML;
            var curInnNum = parseFloat(curInn);
            var nexInnNum = parseFloat(nexInn);
            if(isNaN(curInnNum) || isNaN(nexInnNum)){
                return (curInn.localeCompare(nexInn))*that.flag;
            }
            return (curInnNum -nexInnNum)*that.flag;
        });
        var frg = document.createDocumentFragment();
        for(var i=0;i<ary.length;i++){
            frg.appendChild(ary[i]);
        }
        tBody.appendChild(frg);
        frg = null;
        changeBg();
    }
    for(var i=0;i<aCell.length;i++){
        aCell[i].index = i;
        aCell[i].flag = -1;
        if(aCell[i].className == 'cursor'){
            aCell[i].onclick = function(){
                mySort.call(this,this.index);
            }
        }
    }
}
