utils = {
    listToArray:function listToArray(list){
        try{
            return Array.prototype.slice.call(list);
        }catch (e){
            var ary = [];
            for(var i = 0;i<list.length;i++){
                ary[ary.length] = list[i];
            }
            return ary;

        }
    },
    toJSON:function toJSON(str){
        return "JSON" in window ?JSON.parse(str):eval("("+str+")");
    }
}