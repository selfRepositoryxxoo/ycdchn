function reportPosition(){
    navigator.geolocation.getCurrentPosition(
        function(pos){
            console.log("纬度="+pos.coords.latitude+",经度="+pos.coords.longitude+",精度="+pos.coords.accuracy);
        },
        function(err){
            console.log(err.code+"==>"+err.message);
        }
    );
}
