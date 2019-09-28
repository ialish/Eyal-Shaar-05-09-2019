(window["webpackJsonpcity-weather"]=window["webpackJsonpcity-weather"]||[]).push([[0],{131:function(e,t,a){e.exports=a(314)},136:function(e,t,a){},137:function(e,t,a){},314:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(8),i=a.n(o),c=(a(136),a(9)),s=a(10),l=a(12),u=a(11),h=a(13),m=(a(137),a(318)),f={backgroundColor:"rgba(250, 250, 250, 0.9)"},d=function(e){var t=e.routeChange;e.route;return r.a.createElement(m.a,{className:"justify-content-end",style:f,variant:"pills",defaultActiveKey:"home"},r.a.createElement(m.a.Item,null,r.a.createElement(m.a.Link,{eventKey:"home",onClick:function(){return t("home")}},"Home")),r.a.createElement(m.a.Item,null,r.a.createElement(m.a.Link,{eventKey:"favorites",onClick:function(){return t("favorites")}},"Favorites")))},p=a(79),y=a(319),v=function(e){var t=e.name,a=e.description;return r.a.createElement(y.a.Dialog,null,r.a.createElement(y.a.Header,null,r.a.createElement(y.a.Title,null,t)),r.a.createElement(y.a.Body,null,r.a.createElement("p",null,a)))},g=Object(p.asyncContainer)(p.Typeahead),E="GBQOaTaovFvWYmzOoH4RFrCGKnhKaJOd",C=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).onInputChange=function(e){a.setState({query:e})},a.onSearch=function(e){a.setState({isLoading:!0});var t="https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=".concat(E,"&q=").concat(e);fetch(t).then(function(e){return e.json()}).then(function(e){return a.setState({isLoading:!1,options:e})}).catch(function(e){return a.setState({fetchError:e.message})})},a.onChange=function(e){a.props.loadLocation({key:e[0].Key,city:e[0].LocalizedName}),a.clearRequest()},a.clearRequest=function(){setTimeout(function(){return a.refs.SubjectTypeahead.getInstance().clear()},0)},a.state={isLoading:!1,options:[],query:"",fetchError:""},a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e,t;return this.state.fetchError&&(e=r.a.createElement(v,{name:"Error: ".concat(this.state.fetchError,"!"),description:"Failed to fetch data from the server."})),this.state.query.match(/^[0-9a-zA-Z]*$/)||(t=r.a.createElement(v,{name:"Error: Mistype!",description:"Only english letters are allowed."})),r.a.createElement("div",{style:{width:350}},r.a.createElement(g,{id:"AsyncTypeahead",ref:"SubjectTypeahead",placeholder:"Enter location",isLoading:this.state.isLoading,labelKey:"LocalizedName",onInputChange:this.onInputChange,onSearch:this.onSearch,options:this.state.options,onChange:this.onChange}),r.a.createElement("div",{style:{zIndex:1,position:"fixed",top:0,left:0}},e,t))}}]),t}(r.a.Component),O=a(317),k=a(130),b=a(33),j=a.n(b),x=a(53),w=a.n(x),I=a(316),S=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).handleHeartImage=function(){e.state.favCities.find(function(t){return t.key===e.props.location.key})?e.state.heartImage===j.a&&e.setState({heartImage:w.a}):e.state.heartImage===w.a&&e.setState({heartImage:j.a})},e.addRemoveCity=function(){var t=Object(k.a)(e.state.favCities);if(e.state.heartImage===j.a)t.push(e.props.location),e.setState({heartImage:w.a,favCities:t});else{var a=t.findIndex(function(t){return t.key===e.props.location.key});t.splice(a,1),e.setState({heartImage:j.a,favCities:t})}},e.state={heartImage:j.a,favCities:[]},e}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.state.favCities&&this.handleHeartImage(),this.setState({favCities:JSON.parse(localStorage.getItem("Favorite Cities"))})}},{key:"componentDidUpdate",value:function(){this.handleHeartImage(),localStorage.setItem("Favorite Cities",JSON.stringify(this.state.favCities))}},{key:"render",value:function(){return r.a.createElement("div",{style:{float:"right"}},r.a.createElement("img",{src:this.state.heartImage,alt:"Heart",width:"35px",style:{marginRight:10}}),r.a.createElement(I.a,{variant:"outline-danger",size:"sm",onClick:this.addRemoveCity},"Add to Favorites"))}}]),t}(n.Component),T="GBQOaTaovFvWYmzOoH4RFrCGKnhKaJOd",F=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).fetchForecast=function(){var e="https://dataservice.accuweather.com/currentconditions/v1/".concat(a.props.location.key,"?apikey=").concat(T);fetch(e).then(function(e){return e.json()}).then(function(e){return a.setState({city:a.props.location.city,degreesC:e[0].Temperature.Metric.Value,weatherText:e[0].WeatherText})}).catch(function(e){return a.setState({fetchError:e.message})})},a.state={city:"",degreesC:null,weatherText:"",fetchError:""},a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.fetchForecast()}},{key:"componentDidUpdate",value:function(e){(e.location||{}).key!==this.props.location.key&&this.fetchForecast()}},{key:"render",value:function(){var e;return this.state.fetchError&&(e=r.a.createElement(v,{name:"Error: ".concat(this.state.fetchError,"!"),description:"Failed to fetch data from the server."})),r.a.createElement("div",null,r.a.createElement("h5",null,this.state.city),r.a.createElement("h6",null,Math.round(this.state.degreesC),"\xb0C"),r.a.createElement("h2",{style:{textAlign:"center"}},this.state.weatherText),r.a.createElement("div",{style:{zIndex:1,position:"fixed",top:0,left:0}},e))}}]),t}(r.a.Component),D=a(320),L="GBQOaTaovFvWYmzOoH4RFrCGKnhKaJOd",H=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).fetchForecast=function(){var e="https://dataservice.accuweather.com/forecasts/v1/daily/5day/".concat(a.props.location.key,"?apikey=").concat(L,"&metric=true");fetch(e).then(function(e){return e.json()}).then(function(e){return a.setState({DailyForecasts:e.DailyForecasts})}).catch(function(e){return a.setState({fetchError:e.message})})},a.state={DailyForecasts:[],fetchError:""},a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.fetchForecast()}},{key:"componentDidUpdate",value:function(e){(e.location||{}).key!==this.props.location.key&&this.fetchForecast()}},{key:"render",value:function(){var e,t=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return this.state.fetchError&&(e=r.a.createElement(v,{name:"Error: ".concat(this.state.fetchError,"!"),description:"Failed to fetch data from the server."})),r.a.createElement("div",{style:{display:"flex",flexDirection:"row",marginTop:"2rem"}},this.state.DailyForecasts.map(function(e,a){return r.a.createElement(D.a,{key:a,style:{width:"18rem"}},r.a.createElement(D.a.Body,null,r.a.createElement(D.a.Title,{style:{display:"flex",alignItems:"center",justifyContent:"center"}},t[new Date(1e3*e.EpochDate).getDay()]),r.a.createElement(D.a.Subtitle,{className:"mb-2",style:{display:"flex",alignItems:"center",flexDirection:"column"}},Math.round((e.Temperature.Minimum.Value+e.Temperature.Maximum.Value)/2),"\xb0C")))}),r.a.createElement("div",{style:{zIndex:1,position:"fixed",top:0,left:0}},e))}}]),t}(r.a.Component),K=function(e){var t=e.location;return r.a.createElement("div",null,r.a.createElement(O.a,{variant:"success",style:{marginTop:5,width:460,height:260}},r.a.createElement(S,{location:t}),r.a.createElement(F,{location:t}),r.a.createElement(H,{location:t})))},M="GBQOaTaovFvWYmzOoH4RFrCGKnhKaJOd",R=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).fetchData=function(e){var t=[];e.forEach(function(e){var n="https://dataservice.accuweather.com/currentconditions/v1/".concat(e.key,"?apikey=").concat(M);fetch(n).then(function(e){return e.json()}).then(function(n){var r=Math.round(n[0].Temperature.Metric.Value),o=n[0].WeatherText;t.push({location:e,degreesC:r,weatherText:o}),a.setState({favCitiesData:t})}).catch(function(e){return a.setState({fetchError:e.message})})})},a.handleOnClick=function(e){a.props.loadLocation({key:e.location.key,city:e.location.city}),a.props.routeChange("home")},a.state={favCitiesData:[],fetchError:""},a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=JSON.parse(localStorage.getItem("Favorite Cities"));e&&this.fetchData(e)}},{key:"render",value:function(){var e,t=this;if(this.state.fetchError)return e=r.a.createElement(v,{name:"Error: ".concat(this.state.fetchError,"!"),description:"Failed to fetch data from the server."}),r.a.createElement("div",{style:{zIndex:1,position:"fixed",top:0,left:0}},e);if(!this.state.favCitiesData.length)return null;var a=this.state.favCitiesData.map(function(e){return r.a.createElement(D.a,{key:e.location.key,style:{display:"flex",alignItems:"center",width:"150px",marginRight:"1rem",marginBottom:"1rem"}},r.a.createElement(D.a.Body,null,r.a.createElement(D.a.Title,{style:{display:"flex",alignItems:"center",justifyContent:"center",marginTop:".5rem",marginBottom:"1.5rem",cursor:"pointer"},onClick:function(){return t.handleOnClick(e)}},e.location.city),r.a.createElement(D.a.Subtitle,{className:"mb-2",style:{display:"flex",alignItems:"center",flexDirection:"column"}},r.a.createElement("h3",null,e.degreesC,"\xb0C"),r.a.createElement("h6",null,e.weatherText))))});return r.a.createElement("div",{style:{display:"flex",flexDirection:"row",flexWrap:"wrap",marginTop:"1.5rem",marginLeft:"1rem"}},a)}}]),t}(n.Component),z={key:"215854",city:"Tel Aviv"},W=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).onRouteChange=function(t){e.setState({route:t})},e.loadLocation=function(t){e.setState({location:t})},e.state={route:"home",location:z},e}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(d,{routeChange:this.onRouteChange,route:this.state.route}),"home"===this.state.route?r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"What's The Weather"),r.a.createElement(C,{loadLocation:this.loadLocation}),r.a.createElement(K,{location:this.state.location})):r.a.createElement(R,{loadLocation:this.loadLocation,routeChange:this.onRouteChange}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(W,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},33:function(e,t,a){e.exports=a.p+"static/media/HeartHollow.4ed65843.svg"},53:function(e,t,a){e.exports=a.p+"static/media/HeartFull.efb08012.svg"}},[[131,1,2]]]);
//# sourceMappingURL=main.6af5f1a3.chunk.js.map