$(document).ready(function(){
  function Oferta(name, zawod) {
    var self = this;
    self.name = name;
    self.zawod = zawod;
}



  function viewModel() {
      let self=this;
     this.dayOfWeek = ko.observable('Sunday');
     this.oferts=[];
     self.counter=ko.observable(0);

let refreschCounter=setInterval(function(){
  self.incrementCounter();

},3000);

       $.ajax({
        type:"GET",
         url:'data.xml',
         async: false,
        dataType: 'xml',
        success: function(response){
          let MainXml=$(response).find('payload').text();
          let xmlDoc=$.parseXML(MainXml);
          let MainOferts =$(xmlDoc).find('PositionOpening').find('PositionProfile').each(function(){
            let id=$(this).find('PositionNumberPL').text();
            let zawod=$(this).find('ProfileName').text();
             let oferta = new Oferta(id, zawod);
             self.oferts.push(oferta);
             console.log(oferta);
          });
          console.log("xml loaded successfull");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
          console.log("error! Loading xml faild");
        }
     });
      console.log("oferta: ")
  		self.incrementCounter= function () {
            var previousCount = self.counter();
            if(previousCount>4){
               $("h2").css("color", "red");
              self.counter(0);
            }
            else
            self.counter(previousCount + 1);
        };

        self.visibleStatus=ko.pureComputed(function(number){
          return self.counter() < number? "hideOfert" : "as";
        });

        $(".s1").css("color", "blue");

        self.gridViewModel= new ko.simpleGrid.viewModel({
          data: self.oferts,
          columns:[
            {headerText:"Id", rowText:"name"},
            {headerText:"zawod",rowText:"zawod"}
          ],
          pageSize: 3
        });
  };


  ko.applyBindings(new viewModel()); 


}); 