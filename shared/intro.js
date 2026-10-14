(function () {
  var QA = window.QA, asks = QA.asks, withTap = QA.withTap, stuck = QA.stuck, MATRIX = QA.MATRIX;
  var GATE_ART = QA.GATE_ART;
  var SIGNPOST_ART = QA.SIGNPOST_ART;
  var CHARGE_ART = QA.CHARGE_ART;
  var NOTEBOOK_ART = QA.NOTEBOOK_ART;
  var SCISSORS_ART = QA.SCISSORS_ART;
  var SENSES_ART = QA.SENSES_ART;
  var DOODLE_ART = QA.DOODLE_ART;
  QA.introGate = {
      eyebrow: "", name: "", tag: "h1",
      steps: [
        '<div class="facts-screen"><div class="facts">' +
        '<svg class="facts-frame" viewBox="0 0 1261 1256" fill="currentColor" aria-hidden="true" focusable="false"><path fill-rule="evenodd" d="M1175.8 38.8Q1174.0 36.0 1148.2 35.5Q1122.5 35.0 1091.2 38.5Q1060.0 42.0 977.8 41.5Q895.5 41.0 811.2 47.0Q727.0 53.0 674.8 54.0Q622.5 55.0 547.8 59.0Q473.0 63.0 447.2 62.5Q421.5 62.0 398.8 60.5Q376.0 59.0 303.2 59.0Q230.5 59.0 209.2 58.0Q188.0 57.0 155.2 57.5Q122.5 58.0 81.8 54.8Q41.0 51.5 38.8 51.8Q36.5 52.0 33.8 54.8Q31.0 57.5 29.5 64.0Q28.0 70.5 28.0 98.8Q28.0 127.0 30.5 148.2Q33.0 169.5 34.5 192.0Q36.0 214.5 36.0 244.8Q36.0 275.0 38.0 302.8Q40.0 330.5 39.5 404.2Q39.0 478.0 44.0 562.8Q49.0 647.5 48.0 787.2Q47.0 927.0 44.5 949.2Q42.0 971.5 41.0 1001.8Q40.0 1032.0 38.0 1051.8Q36.0 1071.5 35.5 1108.8Q35.0 1146.0 33.5 1163.8Q32.0 1181.5 32.5 1188.2Q33.0 1195.0 35.8 1199.8Q38.5 1204.5 40.5 1205.5Q42.5 1206.5 45.2 1206.5Q48.0 1206.5 48.8 1207.5Q49.5 1208.5 62.5 1207.0Q75.5 1205.5 99.2 1205.5Q123.0 1205.5 152.2 1207.0Q181.5 1208.5 212.2 1208.5Q243.0 1208.5 269.8 1204.5Q296.5 1200.5 313.0 1199.0Q329.5 1197.5 370.8 1197.0Q412.0 1196.5 439.8 1199.0Q467.5 1201.5 501.2 1201.5Q535.0 1201.5 559.5 1202.5Q584.0 1203.5 615.2 1206.5Q646.5 1209.5 686.5 1212.0Q726.5 1214.5 799.8 1214.5Q873.0 1214.5 918.5 1213.5Q964.0 1212.5 999.0 1213.0Q1034.0 1213.5 1062.8 1216.0Q1091.5 1218.5 1142.8 1218.0Q1194.0 1217.5 1207.5 1216.0Q1221.0 1214.5 1224.2 1211.8Q1227.5 1209.0 1228.5 1203.0Q1229.5 1197.0 1229.0 1155.8Q1228.5 1114.5 1222.0 1060.2Q1215.5 1006.0 1211.0 901.2Q1206.5 796.5 1202.0 744.0Q1197.5 691.5 1194.0 662.8Q1190.5 634.0 1184.0 550.0Q1177.5 466.0 1177.0 445.2Q1176.5 424.5 1179.5 394.8Q1182.5 365.0 1183.5 315.2Q1184.5 265.5 1184.0 228.5Q1183.5 191.5 1181.5 156.8Q1179.5 122.0 1179.5 89.2Q1179.5 56.5 1178.5 49.0Q1177.5 41.5 1175.8 38.8ZM1141.2 45.5Q1167.0 45.5 1168.0 48.5Q1169.0 51.5 1169.5 93.8Q1170.0 136.0 1171.5 157.2Q1173.0 178.5 1173.5 252.2Q1174.0 326.0 1173.0 348.0Q1172.0 370.0 1169.5 391.8Q1167.0 413.5 1167.0 435.8Q1167.0 458.0 1168.5 486.0Q1170.0 514.0 1173.5 545.2Q1177.0 576.5 1178.5 602.8Q1180.0 629.0 1184.5 668.8Q1189.0 708.5 1192.5 749.5Q1196.0 790.5 1200.5 895.8Q1205.0 1001.0 1207.0 1022.5Q1209.0 1044.0 1213.5 1075.8Q1218.0 1107.5 1218.5 1155.2Q1219.0 1203.0 1209.5 1205.0Q1200.0 1207.0 1158.0 1208.0Q1116.0 1209.0 1100.8 1208.5Q1085.5 1208.0 1065.8 1206.0Q1046.0 1204.0 1016.5 1203.5Q987.0 1203.0 848.2 1203.5Q709.5 1204.0 642.8 1198.5Q576.0 1193.0 517.8 1192.0Q459.5 1191.0 430.8 1188.5Q402.0 1186.0 361.8 1187.0Q321.5 1188.0 277.2 1193.5Q233.0 1199.0 187.0 1197.5Q141.0 1196.0 103.8 1196.0Q66.5 1196.0 61.8 1197.0Q57.0 1198.0 54.5 1197.0Q52.0 1196.0 49.2 1196.5Q46.5 1197.0 44.5 1194.0Q42.5 1191.0 44.0 1160.0Q45.5 1129.0 45.5 1104.8Q45.5 1080.5 48.0 1052.8Q50.5 1025.0 51.5 995.2Q52.5 965.5 55.0 941.8Q57.5 918.0 58.0 777.8Q58.5 637.5 54.0 563.2Q49.5 489.0 50.0 415.2Q50.5 341.5 48.5 313.8Q46.5 286.0 46.0 243.8Q45.5 201.5 42.0 167.8Q38.5 134.0 38.0 105.8Q37.5 77.5 39.0 70.5Q40.5 63.5 47.2 63.0Q54.0 62.5 81.2 65.0Q108.5 67.5 248.8 68.5Q389.0 69.5 410.2 71.0Q431.5 72.5 461.2 72.5Q491.0 72.5 538.8 69.5Q586.5 66.5 661.8 64.5Q737.0 62.5 811.8 57.0Q886.5 51.5 934.2 51.0Q982.0 50.5 1014.5 51.5Q1047.0 52.5 1063.5 51.5Q1080.0 50.5 1097.8 48.0Q1115.5 45.5 1141.2 45.5ZM1208.2 14.0Q1207.0 11.0 1200.0 10.0Q1193.0 9.0 1156.5 7.5Q1120.0 6.0 1028.8 6.5Q937.5 7.0 850.5 9.0Q763.5 11.0 689.2 14.0Q615.0 17.0 536.2 18.5Q457.5 20.0 385.2 23.5Q313.0 27.0 261.8 27.0Q210.5 27.0 146.8 24.5Q83.0 22.0 47.2 22.5Q11.5 23.0 9.2 24.2Q7.0 25.5 10.0 249.8Q13.0 474.0 19.0 603.2Q25.0 732.5 24.5 811.2Q24.0 890.0 15.0 1007.8Q6.0 1125.5 6.0 1153.8Q6.0 1182.0 7.0 1196.0Q8.0 1210.0 9.5 1220.0Q11.0 1230.0 13.2 1232.8Q15.5 1235.5 79.2 1236.0Q143.0 1236.5 213.8 1233.0Q284.5 1229.5 346.2 1229.0Q408.0 1228.5 477.5 1231.0Q547.0 1233.5 659.2 1240.0Q771.5 1246.5 828.5 1248.0Q885.5 1249.5 945.2 1249.0Q1005.0 1248.5 1120.8 1244.5Q1236.5 1240.5 1239.0 1241.5Q1241.5 1242.5 1244.8 1242.5Q1248.0 1242.5 1249.2 1241.2Q1250.5 1240.0 1252.5 1230.5Q1254.5 1221.0 1254.5 1166.8Q1254.5 1112.5 1245.0 1012.8Q1235.5 913.0 1234.5 892.0Q1233.5 871.0 1233.0 795.8Q1232.5 720.5 1228.0 660.8Q1223.5 601.0 1217.0 487.5Q1210.5 374.0 1210.0 309.8Q1209.5 245.5 1212.5 180.8Q1215.5 116.0 1215.5 78.2Q1215.5 40.5 1215.0 30.0Q1214.5 19.5 1212.0 18.2Q1209.5 17.0 1208.2 14.0ZM1171.0 18.5Q1204.0 20.5 1205.0 48.8Q1206.0 77.0 1202.5 171.8Q1199.0 266.5 1199.5 314.2Q1200.0 362.0 1207.0 486.0Q1214.0 610.0 1218.0 660.8Q1222.0 711.5 1222.5 782.8Q1223.0 854.0 1224.0 880.0Q1225.0 906.0 1227.5 939.0Q1230.0 972.0 1237.0 1037.2Q1244.0 1102.5 1243.5 1165.2Q1243.0 1228.0 1242.0 1229.0Q1241.0 1230.0 1232.5 1231.0Q1224.0 1232.0 1184.8 1232.5Q1145.5 1233.0 1083.8 1235.5Q1022.0 1238.0 937.2 1238.5Q852.5 1239.0 796.5 1237.0Q740.5 1235.0 659.2 1230.0Q578.0 1225.0 506.0 1222.0Q434.0 1219.0 367.2 1219.0Q300.5 1219.0 211.8 1223.0Q123.0 1227.0 72.2 1226.5Q21.5 1226.0 20.0 1220.0Q18.5 1214.0 17.5 1202.0Q16.5 1190.0 16.5 1152.2Q16.5 1114.5 25.0 1007.8Q33.5 901.0 34.5 875.0Q35.5 849.0 35.5 800.8Q35.5 752.5 29.5 621.2Q23.5 490.0 22.5 382.8Q21.5 275.5 19.5 199.2Q17.5 123.0 17.5 79.2Q17.5 35.5 18.5 34.5Q19.5 33.5 64.2 33.0Q109.0 32.5 168.8 35.0Q228.5 37.5 262.8 37.5Q297.0 37.5 371.2 34.0Q445.5 30.5 522.8 29.0Q600.0 27.5 674.8 24.5Q749.5 21.5 829.5 19.5Q909.5 17.5 1023.8 17.0Q1138.0 16.5 1171.0 18.5Z"/></svg>' +
        '<div class="facts-text">' +
        '<p class="fact seq" style="--d:0.2s"><span class="num">24</span><span class="what">prompts over the course of a year</span></p>' +
        '<p class="fact seq" style="--d:1s"><span class="num">1</span><span class="what">whole-cloth quilt</span></p></div></div></div>',

        CHARGE_ART +
        '<h3>We\u2019ll use this word a lot <span class="big-word">\u2192 CHARGE</span></h3>' +
        '<p>Every prompt in this quilt along is designed to help you find the charge in any particular idea.</p>' +
        '<p class="rule"><strong>A charge is the emotional current inside a detail.</strong> It is what makes a memory, a place, or an object matter to you beyond how it might look to others.</p>' +
        '<p class="seq" style="--d:0.5s">For example, two people might each put a tree on their quilt. For one, it\u2019s <em>the tree they climbed as a kid</em>. For the other, it\u2019s <em>the tree that fell on their house</em>.</p>' +
        '<p class="seq" style="--d:1s">A charge does not have to be positive. It just has to be true.</p>',

        '<h3>Why we write before we sew</h3>' +
        '<p>To help you find your charge for each prompt, you go through the same <strong>four gates</strong> each time. As you pass through each one, something opens up: a memory, a feeling, an image you can sew.</p>' +
        '<p><strong>20 minutes</strong> to work through all four gates.</p>' +
        '<ol class="gate-list" aria-label="The four gates">' +
        '<li class="seq" style="--d:0.4s"><span class="k">Gate 1</span>Uncover the charge</li>' +
        '<li class="seq" style="--d:0.8s"><span class="k">Gate 2</span>Deepen the charge</li>' +
        '<li class="seq" style="--d:1.2s"><span class="k">Gate 3</span>Visualize the charge</li>' +
        '<li class="seq" style="--d:1.6s"><span class="k">Gate 4</span>Test the charge</li></ol>' +
        '<p class="seq" style="--d:2.1s"><strong>Same four gates, new questions each time</strong> to fit the prompt you\'re working on.</p>' +
        GATE_ART,

        '<h3>Try it once, then make it yours</h3>' +
        '<p class="lead rule">Try the full version of all four gates at least once. Go through each one in order, so you feel what each one does.</p>' +
        '<p>After that, make it your own. Skip a gate, stay in one longer, or start directly from your fabric. Use whatever gets you to something good that you can sew.</p>' +
        NOTEBOOK_ART,

        '<div class="facts-screen"><p class="begin-text seq" style="--d:0.2s">Let\u2019s begin</p></div>'
      ]
    };
})();
