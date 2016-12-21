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
  $(".oferta").css("display", "none")
  $(".s_"+self.counter()).css("display", "block");
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
            if(previousCount+1>=self.oferts.length/3){
               $("h2").css("color", "red");
              self.counter(0);
            }
            else
            self.counter(previousCount + 1);
        };

        self.visibleStatus=ko.pureComputed(function(number){
          return self.counter() < number? "hideOfert" : "as";
        });

        
  };


  ko.applyBindings(new viewModel()); 


}); 