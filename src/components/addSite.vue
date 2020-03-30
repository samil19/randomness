<template>
  <div id="belowMe">
    <ValidationObserver ref="observer" slim>
      <div class="row">
        <div class="col-xs-12 col-md-6 col-lg-3">
          <ValidationProvider ref="nameVali" name="name" rules="required|alpha_num" v-slot="v">
            <label for="Nombre">Name</label>
            <input class="form-control col-12" name="Nombre" v-model="form.name" type="text" />
            <span>{{ v.errors[0] }}</span>
          </ValidationProvider>
        </div>
        <!-- Next Version -->
        <!-- <div class="align-items-center col-xs-12 col-md-6 col-lg-3">
        <ValidationProvider name="name" rules="required" v-slot="v">
          <label for="logo">Logo</label>
          <input class="form-control col-12" name="logo" type="text" />
          <span>{{ v.errors[0] }}</span>
        </ValidationProvider>
        </div>-->
        <div class="align-items-center col-xs-12 col-md-6 col-lg-3">
          <ValidationProvider name="Url" ref="urlVali" rules="required|url" v-slot="v">
            <label for="url">Url</label>
            <input class="form-control col-12" name="Url" v-model="form.url" type="text" />
            <span>{{ v.errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="align-items-center d-flex justify-content-center col-xs-12 col-md-6 col-lg-1">
          <ValidationProvider name="Color" ref="colorVali" rules="required" v-slot="v" slim>
            <div>
              <label>Color</label>
              <swatches v-model="form.color" colors="text-advanced"></swatches>
              <span>{{ v.errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>
        <div class="align-items-center d-flex justify-content-center col-xs-12 col-md-6 col-lg-3">
          <ValidationProvider name="Tags" ref="tagsVali" rules="required" v-slot="v">
            <label>Tags</label>
            <multiselect
              v-model="form.tags"
              tag-placeholder="Add this as new tag"
              placeholder="Search or add a tag"
              label="name"
              track-by="name"
              :options="tags"
              :multiple="true"
              :taggable="true"
            ></multiselect>
            <span>{{ v.errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
    </ValidationObserver>
    <div class="col-sm-12 align-items-center d-flex justify-content-center mt-3">
      <button class="btn btn-success mr-3" v-on:click="add()">Save</button>
      <button class="btn btn-primary" v-on:click="goBack()">Go back!</button>
    </div>
    <div class="col-sm-10 align-items-center d-flex justify-content-center mb-3">
      <h4 v-if="message">{{message}}</h4>
    </div>
  </div>
</template>

<script>
import Swatches from "vue-swatches";
import { ValidationProvider, validate, ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import { required, alpha_num, max } from "vee-validate/dist/rules";
import { messages } from "vee-validate/dist/locale/en.json";
import Multiselect from "vue-multiselect";
const fb = require("../firebaseConfig.js");

export default {
  name: "addSite",
  components: {
    ValidationProvider,
    Swatches,
    ValidationObserver,
    Multiselect
  },
  data() {
    return {
      form: {
        collection: "",
        color: "#1CA085",
        logo: "",
        name: "",
        url: "",
        tags: [],
        isItChecked: false
      },
      name: "",
      message: "",
      mainTLD: [
        ".com",
        ".org",
        ".net",
        ".int",
        ".edu",
        ".gov",
        ".mil",
        ".io",
        ".com.ac",
        ".edu.ac",
        ".gov.ac",
        ".net.ac",
        ".mil.ac",
        ".org.ac",
        ".nom.ad",
        ".co.ae",
        ".net.ae",
        ".org.ae",
        ".sch.ae",
        ".ac.ae",
        ".gov.ae",
        ".mil.ae",
        ".accident-investigation.aero",
        ".accident-prevention.aero",
        ".aerobatic.aero",
        ".aeroclub.aero",
        ".aerodrome.aero",
        ".agents.aero",
        ".aircraft.aero",
        ".airline.aero",
        ".airport.aero",
        ".air-surveillance.aero",
        ".airtraffic.aero",
        ".air-traffic-control.aero",
        ".ambulance.aero",
        ".amusement.aero",
        ".association.aero",
        ".author.aero",
        ".ballooning.aero",
        ".broker.aero",
        ".caa.aero",
        ".cargo.aero",
        ".catering.aero",
        ".certification.aero",
        ".championship.aero",
        ".charter.aero",
        ".civilaviation.aero",
        ".club.aero",
        ".conference.aero",
        ".consultant.aero",
        ".consulting.aero",
        ".control.aero",
        ".council.aero",
        ".crew.aero",
        ".design.aero",
        ".dgca.aero",
        ".educator.aero",
        ".emergency.aero",
        ".engine.aero",
        ".engineer.aero",
        ".entertainment.aero",
        ".equipment.aero",
        ".exchange.aero",
        ".express.aero",
        ".federation.aero",
        ".flight.aero",
        ".fuel.aero",
        ".gliding.aero",
        ".government.aero",
        ".groundhandling.aero",
        ".group.aero",
        ".hanggliding.aero",
        ".homebuilt.aero",
        ".insurance.aero",
        ".journal.aero",
        ".journalist.aero",
        ".leasing.aero",
        ".logistics.aero",
        ".magazine.aero",
        ".maintenance.aero",
        ".media.aero",
        ".microlight.aero",
        ".modelling.aero",
        ".navigation.aero",
        ".parachuting.aero",
        ".paragliding.aero",
        ".passenger-association.aero",
        ".pilot.aero",
        ".press.aero",
        ".production.aero",
        ".recreation.aero",
        ".repbody.aero",
        ".res.aero",
        ".research.aero",
        ".rotorcraft.aero",
        ".safety.aero",
        ".scientist.aero",
        ".services.aero",
        ".show.aero",
        ".skydiving.aero",
        ".software.aero",
        ".student.aero",
        ".trader.aero",
        ".trading.aero",
        ".trainer.aero",
        ".union.aero",
        ".workinggroup.aero",
        ".works.aero",
        ".gov.af",
        ".com.af",
        ".org.af",
        ".net.af",
        ".edu.af",
        ".com.ag",
        ".org.ag",
        ".net.ag",
        ".co.ag",
        ".nom.ag",
        ".off.ai",
        ".com.ai",
        ".net.ai",
        ".org.ai",
        ".com.al",
        ".edu.al",
        ".gov.al",
        ".mil.al",
        ".net.al",
        ".org.al",
        ".co.am",
        ".com.am",
        ".commune.am",
        ".net.am",
        ".org.am",
        ".ed.ao",
        ".gv.ao",
        ".og.ao",
        ".co.ao",
        ".pb.ao",
        ".it.ao",
        ".com.ar",
        ".edu.ar",
        ".gob.ar",
        ".gov.ar",
        ".int.ar",
        ".mil.ar",
        ".musica.ar",
        ".net.ar",
        ".org.ar",
        ".tur.ar",
        ".e164.arpa",
        ".in-addr.arpa",
        ".ip6.arpa",
        ".iris.arpa",
        ".uri.arpa",
        ".urn.arpa",
        ".gov.as",
        ".ac.at",
        ".co.at",
        ".gv.at",
        ".or.at",
        ".com.au",
        ".net.au",
        ".org.au",
        ".edu.au",
        ".gov.au",
        ".asn.au",
        ".id.au",
        ".info.au",
        ".conf.au",
        ".oz.au",
        ".act.au",
        ".nsw.au",
        ".nt.au",
        ".qld.au",
        ".sa.au",
        ".tas.au",
        ".vic.au",
        ".wa.au",
        ".act.edu.au",
        ".catholic.edu.au",
        ".nsw.edu.au",
        ".nt.edu.au",
        ".qld.edu.au",
        ".sa.edu.au",
        ".tas.edu.au",
        ".vic.edu.au",
        ".wa.edu.au",
        ".qld.gov.au",
        ".sa.gov.au",
        ".tas.gov.au",
        ".vic.gov.au",
        ".wa.gov.au",
        ".education.tas.edu.au",
        ".schools.nsw.edu.au",
        ".com.aw",
        ".com.az",
        ".net.az",
        ".int.az",
        ".gov.az",
        ".org.az",
        ".edu.az",
        ".info.az",
        ".pp.az",
        ".mil.az",
        ".name.az",
        ".pro.az",
        ".biz.az",
        ".com.ba",
        ".edu.ba",
        ".gov.ba",
        ".mil.ba",
        ".net.ba",
        ".org.ba",
        ".biz.bb",
        ".co.bb",
        ".com.bb",
        ".edu.bb",
        ".gov.bb",
        ".info.bb",
        ".net.bb",
        ".org.bb",
        ".store.bb",
        ".tv.bb",
        ".*.bd",
        ".ac.be",
        ".gov.bf",
        ".a.bg",
        ".b.bg",
        ".c.bg",
        ".d.bg",
        ".e.bg",
        ".f.bg",
        ".g.bg",
        ".h.bg",
        ".i.bg",
        ".j.bg",
        ".k.bg",
        ".l.bg",
        ".m.bg",
        ".n.bg",
        ".o.bg",
        ".p.bg",
        ".q.bg",
        ".r.bg",
        ".s.bg",
        ".t.bg",
        ".u.bg",
        ".v.bg",
        ".w.bg",
        ".x.bg",
        ".y.bg",
        ".z.bg",
        ".0.bg",
        ".1.bg",
        ".2.bg",
        ".3.bg",
        ".4.bg",
        ".5.bg",
        ".6.bg",
        ".7.bg",
        ".8.bg",
        ".9.bg",
        ".com.bh",
        ".edu.bh",
        ".net.bh",
        ".org.bh",
        ".gov.bh",
        ".co.bi",
        ".com.bi",
        ".edu.bi",
        ".or.bi",
        ".org.bi",
        ".asso.bj",
        ".barreau.bj",
        ".gouv.bj",
        ".com.bm",
        ".edu.bm",
        ".gov.bm",
        ".net.bm",
        ".org.bm",
        ".com.bn",
        ".edu.bn",
        ".gov.bn",
        ".net.bn",
        ".org.bn",
        ".com.bo",
        ".edu.bo",
        ".gob.bo",
        ".int.bo",
        ".org.bo",
        ".net.bo",
        ".mil.bo",
        ".tv.bo",
        ".web.bo",
        ".academia.bo",
        ".agro.bo",
        ".arte.bo",
        ".blog.bo",
        ".bolivia.bo",
        ".ciencia.bo",
        ".cooperativa.bo",
        ".democracia.bo",
        ".deporte.bo",
        ".ecologia.bo",
        ".economia.bo",
        ".empresa.bo",
        ".indigena.bo",
        ".industria.bo",
        ".info.bo",
        ".medicina.bo",
        ".movimiento.bo",
        ".musica.bo",
        ".natural.bo",
        ".nombre.bo",
        ".noticias.bo",
        ".patria.bo",
        ".politica.bo",
        ".profesional.bo",
        ".plurinacional.bo",
        ".pueblo.bo",
        ".revista.bo",
        ".salud.bo",
        ".tecnologia.bo",
        ".tksat.bo",
        ".transporte.bo",
        ".wiki.bo",
        ".9guacu.br",
        ".abc.br",
        ".adm.br",
        ".adv.br",
        ".agr.br",
        ".aju.br",
        ".am.br",
        ".anani.br",
        ".aparecida.br",
        ".arq.br",
        ".art.br",
        ".ato.br",
        ".b.br",
        ".barueri.br",
        ".belem.br",
        ".bhz.br",
        ".bio.br",
        ".blog.br",
        ".bmd.br",
        ".boavista.br",
        ".bsb.br",
        ".campinagrande.br",
        ".campinas.br",
        ".caxias.br",
        ".cim.br",
        ".cng.br",
        ".cnt.br",
        ".com.br",
        ".contagem.br",
        ".coop.br",
        ".cri.br",
        ".cuiaba.br",
        ".curitiba.br",
        ".def.br",
        ".ecn.br",
        ".eco.br",
        ".edu.br",
        ".emp.br",
        ".eng.br",
        ".esp.br",
        ".etc.br",
        ".eti.br",
        ".far.br",
        ".feira.br",
        ".flog.br",
        ".floripa.br",
        ".fm.br",
        ".fnd.br",
        ".fortal.br",
        ".fot.br",
        ".foz.br",
        ".fst.br",
        ".g12.br",
        ".ggf.br",
        ".goiania.br",
        ".gov.br",
        ".ac.gov.br",
        ".al.gov.br",
        ".am.gov.br",
        ".ap.gov.br",
        ".ba.gov.br",
        ".ce.gov.br",
        ".df.gov.br",
        ".es.gov.br",
        ".go.gov.br",
        ".ma.gov.br",
        ".mg.gov.br",
        ".ms.gov.br",
        ".mt.gov.br",
        ".pa.gov.br",
        ".pb.gov.br",
        ".pe.gov.br",
        ".pi.gov.br",
        ".pr.gov.br",
        ".rj.gov.br",
        ".rn.gov.br",
        ".ro.gov.br",
        ".rr.gov.br",
        ".rs.gov.br",
        ".sc.gov.br",
        ".se.gov.br",
        ".sp.gov.br",
        ".to.gov.br",
        ".gru.br",
        ".imb.br",
        ".ind.br",
        ".inf.br",
        ".jab.br",
        ".jampa.br",
        ".jdf.br",
        ".joinville.br",
        ".jor.br",
        ".jus.br",
        ".leg.br",
        ".lel.br",
        ".londrina.br",
        ".macapa.br",
        ".maceio.br",
        ".manaus.br",
        ".maringa.br",
        ".mat.br",
        ".med.br",
        ".mil.br",
        ".morena.br",
        ".mp.br",
        ".mus.br",
        ".natal.br",
        ".net.br",
        ".niteroi.br",
        ".*.nom.br",
        ".not.br",
        ".ntr.br",
        ".odo.br",
        ".ong.br",
        ".org.br",
        ".osasco.br",
        ".palmas.br",
        ".poa.br",
        ".ppg.br",
        ".pro.br",
        ".psc.br",
        ".psi.br",
        ".pvh.br",
        ".qsl.br",
        ".radio.br",
        ".rec.br",
        ".recife.br",
        ".ribeirao.br",
        ".rio.br",
        ".riobranco.br",
        ".riopreto.br",
        ".salvador.br",
        ".sampa.br",
        ".santamaria.br",
        ".santoandre.br",
        ".saobernardo.br",
        ".saogonca.br",
        ".sjc.br",
        ".slg.br",
        ".slz.br",
        ".sorocaba.br",
        ".srv.br",
        ".taxi.br",
        ".tc.br",
        ".teo.br",
        ".the.br",
        ".tmp.br",
        ".trd.br",
        ".tur.br",
        ".tv.br",
        ".udi.br",
        ".vet.br",
        ".vix.br",
        ".vlog.br",
        ".wiki.br",
        ".zlg.br",
        ".com.bs",
        ".net.bs",
        ".org.bs",
        ".edu.bs",
        ".gov.bs",
        ".com.bt",
        ".edu.bt",
        ".gov.bt",
        ".net.bt",
        ".org.bt",
        ".co.bw",
        ".org.bw",
        ".gov.by",
        ".mil.by",
        ".com.by",
        ".of.by",
        ".com.bz",
        ".net.bz",
        ".org.bz",
        ".edu.bz",
        ".gov.bz",
        ".ab.ca",
        ".bc.ca",
        ".mb.ca",
        ".nb.ca",
        ".nf.ca",
        ".nl.ca",
        ".ns.ca",
        ".nt.ca",
        ".nu.ca",
        ".on.ca",
        ".pe.ca",
        ".qc.ca",
        ".sk.ca",
        ".yk.ca",
        ".gc.ca",
        ".gov.cd",
        ".org.ci",
        ".or.ci",
        ".com.ci",
        ".co.ci",
        ".edu.ci",
        ".ed.ci",
        ".ac.ci",
        ".net.ci",
        ".go.ci",
        ".asso.ci",
        ".aéroport.ci",
        ".int.ci",
        ".presse.ci",
        ".md.ci",
        ".gouv.ci",
        ".*.ck",
        ".!www.ck",
        ".aprendemas.cl",
        ".co.cl",
        ".gob.cl",
        ".gov.cl",
        ".mil.cl",
        ".co.cm",
        ".com.cm",
        ".gov.cm",
        ".net.cm",
        ".ac.cn",
        ".com.cn",
        ".edu.cn",
        ".gov.cn",
        ".net.cn",
        ".org.cn",
        ".mil.cn",
        ".公司.cn",
        ".网络.cn",
        ".網絡.cn",
        ".ah.cn",
        ".bj.cn",
        ".cq.cn",
        ".fj.cn",
        ".gd.cn",
        ".gs.cn",
        ".gz.cn",
        ".gx.cn",
        ".ha.cn",
        ".hb.cn",
        ".he.cn",
        ".hi.cn",
        ".hl.cn",
        ".hn.cn",
        ".jl.cn",
        ".js.cn",
        ".jx.cn",
        ".ln.cn",
        ".nm.cn",
        ".nx.cn",
        ".qh.cn",
        ".sc.cn",
        ".sd.cn",
        ".sh.cn",
        ".sn.cn",
        ".sx.cn",
        ".tj.cn",
        ".xj.cn",
        ".xz.cn",
        ".yn.cn",
        ".zj.cn",
        ".hk.cn",
        ".mo.cn",
        ".tw.cn",
        ".arts.co",
        ".com.co",
        ".edu.co",
        ".firm.co",
        ".gov.co",
        ".info.co"
      ],
      tags: [
        { name: "#love" },
        { name: "#instagood" },
        { name: "#photooftheday" },
        { name: "#beautiful" },
        { name: "#fashion" },
        { name: "#tbt" },
        { name: "#happy" },
        { name: "#cute" },
        { name: "#followme" },
        { name: "#like4like" },
        { name: "#follow" },
        { name: "#me" },
        { name: "#picoftheday" },
        { name: "#selfie" },
        { name: "#instadaily" },
        { name: "#friends" },
        { name: "#summer" },
        { name: "#girl" },
        { name: "#art" },
        { name: "#fun" },
        { name: "#repost" },
        { name: "#smile" },
        { name: "#nature" },
        { name: "#instalike" },
        { name: "#food" },
        { name: "#style" },
        { name: "#tagsforlikes" },
        { name: "#family" },
        { name: "#likeforlike" },
        { name: "#igers" },
        { name: "#fitness" },
        { name: "#nofilter" },
        { name: "#follow4follow" },
        { name: "#instamood" },
        { name: "#amazing" },
        { name: "#life" },
        { name: "#travel" },
        { name: "#beauty" },
        { name: "#vscocam" },
        { name: "#sun" },
        { name: "#bestoftheday" },
        { name: "#music" },
        { name: "#followforfollow" },
        { name: "#beach" },
        { name: "#instagram" },
        { name: "#photo" },
        { name: "#sky" },
        { name: "#vsco" },
        { name: "#dog" },
        { name: "#l4l" },
        { name: "#sunset" },
        { name: "#f4f" },
        { name: "#ootd" },
        { name: "#pretty" },
        { name: "#swag" },
        { name: "#makeup" },
        { name: "#foodporn" },
        { name: "#hair" },
        { name: "#cat" },
        { name: "#party" },
        { name: "#girls" },
        { name: "#photography" },
        { name: "#cool" },
        { name: "#baby" },
        { name: "#lol" },
        { name: "#tflers" },
        { name: "#model" },
        { name: "#motivation" },
        { name: "#night" },
        { name: "#instapic" },
        { name: "#funny" },
        { name: "#gym" },
        { name: "#healthy" },
        { name: "#yummy" },
        { name: "#hot" },
        { name: "#design" },
        { name: "#black" },
        { name: "#pink" },
        { name: "#flowers" },
        { name: "#christmas" },
        { name: "#blue" },
        { name: "#work" },
        { name: "#instafood" },
        { name: "#fit" },
        { name: "#instacool" },
        { name: "#iphoneonly" },
        { name: "#wedding" },
        { name: "#blackandwhite" },
        { name: "#workout" },
        { name: "#lifestyle" },
        { name: "#handmade" },
        { name: "#followback" },
        { name: "#instafollow" },
        { name: "#home" },
        { name: "#drawing" },
        { name: "#my" },
        { name: "#nyc" },
        { name: "#webstagram" },
        { name: "#sweet" },
        { name: "#instalove" },
        { name: "#gethealthy" },
        { name: "#healthylife" },
        { name: "#healthtalk" },
        { name: "#eatclean" },
        { name: "#fitfood" },
        { name: "#nutrition" },
        { name: "#fitquote" },
        { name: "#fitnessmotivation" },
        { name: "#fitspo" },
        { name: "#getfit" },
        { name: "#fitfam" },
        { name: "#trainhard" },
        { name: "#noexcuses" },
        { name: "#fitnessaddict" },
        { name: "#gymlife" },
        { name: "#girlswholift" },
        { name: "#workout" },
        { name: "#fitlife" },
        { name: "#gymlife" },
        { name: "#sweat" },
        { name: "#foodie" },
        { name: "#foodporn" },
        { name: "#foodgasm" },
        { name: "#nom" },
        { name: "#food" },
        { name: "#pizza" },
        { name: "#foodporn" },
        { name: "#foodstagram" },
        { name: "#menwhocook" },
        { name: "#sushi" },
        { name: "#yummy" },
        { name: "#foodcoma" },
        { name: "#eathealthy" },
        { name: "#instafood" },
        { name: "#delicious" },
        { name: "#foodpic" },
        { name: "#cooking" },
        { name: "#snack" },
        { name: "#tasty" },
        { name: "#cleaneating" },
        { name: "#travel" },
        { name: "#instatravel" },
        { name: "#travelgram" },
        { name: "#tourist" },
        { name: "#tourism" },
        { name: "#vacation" },
        { name: "#traveling" },
        { name: "#travelblogger" },
        { name: "#wanderlust" },
        { name: "#ilovetravel" },
        { name: "#instavacation" },
        { name: "#traveldeeper" },
        { name: "#getaway" },
        { name: "#wanderer" },
        { name: "#adventure" },
        { name: "#travelphotography" },
        { name: "#roadtrip" },
        { name: "#mytravelgram" },
        { name: "#igtravel" },
        { name: "#traveler" },
        { name: "#technology" },
        { name: "#science" },
        { name: "#bigdata" },
        { name: "#iphone" },
        { name: "#ios" },
        { name: "#android" },
        { name: "#mobile" },
        { name: "#video" },
        { name: "#design" },
        { name: "#innovation" },
        { name: "#startups" },
        { name: "#tech" },
        { name: "#cloud" },
        { name: "#gadget" },
        { name: "#instatech" },
        { name: "#electronic" },
        { name: "#device" },
        { name: "#techtrends" },
        { name: "#technews" },
        { name: "#engineering" },
        { name: "#fashion" },
        { name: "#fashionista" },
        { name: "#fashionblogger" },
        { name: "#ootd" },
        { name: "#style" },
        { name: "#stylish" },
        { name: "#streetstyle" },
        { name: "#streetwear" },
        { name: "#fashioninspo" },
        { name: "#trend" },
        { name: "#styleoftheday" },
        { name: "#stylegram" },
        { name: "#mensfashion" },
        { name: "#lookbook" },
        { name: "#todayiwore" },
        { name: "#beauty" },
        { name: "#makeupaddict" },
        { name: "#hair" },
        { name: "#instafashion" },
        { name: "#vintage" },
        { name: "#programming" },
        { name: "#coding" },
        { name: "#programmer" },
        { name: "#developer" },
        { name: "#code" },
        { name: "#technology" },
        { name: "#python" },
        { name: "#coder" },
        { name: "#javascript" },
        { name: "#tech" },
        { name: "#java" },
        { name: "#computerscience" },
        { name: "#software" },
        { name: "#webdeveloper" },
        { name: "#html" },
        { name: "#linux" },
        { name: "#css" },
        { name: "#webdevelopment" },
        { name: "#hacking" },
        { name: "#development" },
        { name: "#webdesign" },
        { name: "#codinglife" },
        { name: "#computer" },
        { name: "#softwaredeveloper" },
        { name: "#php" },
        { name: "#hacker" },
        { name: "#programmers" },
        { name: "#programmingmemes" },
        { name: "#softwareengineer" },
        { name: "#bhfyp" }
      ]
    };
  },
  mounted() {
    //   WorkAround to error of VeeValidate
    // document
    //   .getElementById("belowMe")
    //   .firstElementChild.setAttribute("class", "row");
    //   document.getElementsByTagName("div")[1].setAttribute("class","row");
    extend("url", {
      validate: str => {
        var pattern = new RegExp(
          "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
          "i"
        ); // fragment locator
        let result = !!pattern.test(str);
        return result;
      },
      message: "This is not a valid url"
    });
    extend("alpha_num", {
      ...alpha_num,
      message: "This field can only contain alpha numeric expressions"
    });
    extend("max", {
      ...max,
      message: "This field is only for the main url to much characters"
    });

    // Override the default message.
    extend("required", {
      ...required,
      message: "This field is required"
    });
  },
  methods: {
    async add() {
      const that = this;
      const isItValid = await this.validate();
      if (isItValid) {
        const exist = this.chechkExist(); 
        if(!exist){
        that.form.collection = that.form.name.toLowerCase() + "Url";
        fb.db
          .collection("sites")
          .add(that.form)
          .then(() => {
            that.resetForm();
            that.message = "Thank You!";
            that.$store.dispatch("getAllSites");
          })
          .catch(() => {
            that.message = "Houston we had a problem!, Try Again!";
          });
        }else{
          that.resetForm();
          that.message = "This site already exist, but thank you!";
        }
      }
    },
    async validate() {
      const valid = await this.$refs.observer.validate();
      let stopIndex = null;
      var that = this;
      if (valid) {
        this.cleanFirstCharactersUrl();
        await this.mainTLD.every((element, index) => {
          let result = that.form.url.indexOf(element) > -1;
          if (result) {
            stopIndex = index;
            return false;
          }
          return true;
        });
        if (stopIndex == null) {
          this.message =
            "Looks like this is not a valid url, is it .com, .net or other?";
          return false;
        } else {
          this.cleanLastCharactersUrl(stopIndex);
          return true;
        }
        // const end = this.form.url.indexOf(".com") + 4;
      } else {
        return false;
      }
    },
    cleanFirstCharactersUrl() {
      const element = this.form.url;
      const http = element.indexOf("://");
      const www = element.indexOf("www.");

      if (www > -1) {
        this.form.url = element.substring(www + 4, element.length + 1);
      } else if (http > -1) {
        this.form.url = element.substring(http + 3, element.length + 1);
      }
    },
    cleanLastCharactersUrl(indexTLD) {
      const tld = this.mainTLD[indexTLD];
      const lengthTLD = tld.length;
      const positionTLD = this.form.url.indexOf(tld);

      this.form.url = this.form.url.substring(0, positionTLD + lengthTLD);
    },
    async chechkExist(){
      var that = this;
      const sites = this.$store.state.allSites;
      await sites.forEach(element => {
        if(element.url.indexOf(that.form.url) > -1){
          return true;
        }
      });
      return false;
    },
    resetForm() {
      this.form = {
        collection: "",
        color: "#1CA085",
        logo: "",
        name: "",
        url: ""
      };
    },
    goBack() {
      this.resetForm();
      this.$emit("toggleAddingSite");
    },
    addTag(newTag) {
      const tag = {
        name: newTag
      };
      this.form.tags.push(tag);
    }
  }
};
</script>

<style>
span {
  width: inherit;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>