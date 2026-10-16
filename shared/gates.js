(function () {
  var QA = window.QA, asks = QA.asks, withTap = QA.withTap, stuck = QA.stuck, MATRIX = QA.MATRIX;
  // The closing drawing on each gate screen (an hourglass). The intro and title screens keep the original gate drawing from art.js.
  var GATE_ART = '<div class="gate-art-wrap"><svg class="gate-art" viewBox="382 67 513 1051" role="img" aria-label="An hourglass, drawn in line art" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="m666 593.33c5.8594 7.6328 9.3594 16.809 10.07 26.402 0.71094 9.5938-1.3984 19.188-6.0703 27.598-1.1758 3.8125-0.79297 7.9375 1.0664 11.469 15.199 32 30.668 63.867 46.133 95.867 21.602 44.668 43.602 89.066 64.668 134 11.199 23.867 21.066 48.398 30.668 70.668 3.7344 1.8672 5.1992 3.1992 6.668 3.332 28.934 1.7344 28.934 1.7344 28.398 32.133 0 16.535-2.1328 33.199-0.93359 49.602v-0.003906c1.457 17.203-5.4961 34.043-18.668 45.203-4.8203 4.375-10.785 7.2891-17.199 8.3984-21.074 4.0664-42.422 6.5625-63.867 7.4648-93.512 0-186.84 4.2227-280 12.668-23.184 0.76953-46.391-0.57031-69.332-4-12.668-1.1992-17.199-7.7344-15.332-20.398 4.8008-34.398 10.133-68.668 15.332-102.93 0.23828-3.8086 2.0977-7.3281 5.1055-9.6719 3.0078-2.3438 6.875-3.2891 10.625-2.5938l23.734 1.7344c7.6016-16.398 15.602-31.734 21.867-47.734 10.668-26.668 20.535-54.133 30.266-81.332v-0.003906c21.898-59.027 51.297-115 87.469-166.53 11.543-14.648 24.109-28.461 37.598-41.336-13.332-15.734-10-34-2.2656-51.734v0.003906c-20.66-35.848-37.551-73.738-50.398-113.07-15.543-46.469-36.914-90.777-63.602-131.87-20.133-32-43.465-62.266-53.332-99.066-34.934-3.7344-35.602-3.8672-33.332-39.199 2.2656-35.332 5.7344-69.199 8.9336-103.73h-0.003906c1.0039-5.3086 2.4297-10.523 4.2695-15.602h17.199c62.742 3.8633 125.7 2.75 188.27-3.332 26.668-2.2656 53.332-1.7344 79.332-4 50.668-3.3359 100.4-8.4023 150.67-13.199 4.9336 0 9.8672-1.4648 14.801-1.4648 14.535 0 20.266 4.1328 20.398 18.668 0 38.801-0.66797 77.734-1.332 116.54v-0.007813c0.68359 6.6602-0.89063 13.355-4.4688 19.016-3.5781 5.6562-8.9531 9.9492-15.266 12.184-5 2.6797-9.0195 6.8828-11.465 12-31.734 58.934-62.668 118.4-94.668 177.07-25.465 46.398-52.266 92-78.934 137.6-6.668 11.328-14.934 21.598-23.066 33.195zm-196.13-346c1.793 19.379 9 37.859 20.801 53.336 22.398 37.602 46.266 74.535 65.465 113.73 10 20.535 18.801 26.668 37.465 6.8008l0.003906-0.003906c6.3047-6.5117 11.977-13.609 16.934-21.199 4.8008-7.6016 7.8672-16.398 12.133-24.398 13.332-26.668 30.801-29.867 54.133-11.867 6.8242 4.7188 12.777 10.582 17.598 17.332 14.133 22.668 37.465 23.199 57.734 1.4648v0.003906c34.352-36.984 61.93-79.727 81.469-126.27 15.867-36.934 9.1992-47.066-30.934-48.934h-7.4648c-31.465 1.6016-62.801 2.9336-94.266 4.8008-8 0-16 2.3984-22.934 3.4648l-4.9375 24.402-15.867-22.398c-38.801-0.66797-76.801-1.8672-114.8-1.8672-17.332 0-34.535 2.2656-51.734 4-2 0-3.7344 2.8008-5.6016 4.1328l8.2695 20.668zm58.133 570.27c-14.398 20.797-58.668 142.4-58.398 163.07 26.668 0 52.668 2 78.801 1.1992 26.133-0.80078 54.398-4 81.602-6.3984 27.199-2.3984 53.332-4.668 79.066-7.4648 25.734-2.8008 53.332 1.8672 81.066-6l-0.003907-0.003906c-16.957-50.984-39.027-100.12-65.867-146.67-4.0039 0.625-7.9336 1.6523-11.73 3.0664-35.465 19.199-69.332 19.465-101.2-7.6016l-0.003907 0.003906c-0.57031-0.63672-1.3086-1.1016-2.1328-1.3359-10.203-1.8164-20.57-2.5742-30.934-2.2656-15.465 1.4688-30.398 6.1328-50.266 10.402zm217.2-397.2c-38.668-8.1328-38.668-8.1328-68.668-38.801-1.1992-1.1992-2.2656-2.3984-3.4648-3.4648-11.602-9.7344-19.332-9.0664-29.199 3.0664-3.1992 3.7656-5.8867 7.9336-8 12.402-9.7617 27.816-30.902 50.168-58.133 61.465 0.35938 6.0078 1.3867 11.953 3.0664 17.734 13.332 31.066 26.668 62.266 40.801 92.668 9.7344 20.133 18.668 21.867 32.535 4.2656h-0.003907c18.488-24.105 35.496-49.305 50.934-75.469 14.934-23.598 26.535-48.664 40.133-73.867zm-203.73 374.4c8.4766-0.58984 16.805-2.5273 24.668-5.7344 6.8242-4.75 15.055-7.0586 23.355-6.5469 8.2969 0.50781 16.184 3.8008 22.379 9.3477 6 4.3984 13.332 7.1992 18.801 11.734 23.332 18.801 47.332 9.1992 70.934-4.668 3.5-1.5078 6.1875-4.4414 7.3867-8.0586s0.78906-7.5781-1.1211-10.875c-16.266-34.133-31.602-68.934-49.332-102.13-11.066-20.668-24.398-21.602-42-5.7344-34.934 31.734-54.27 74.535-76 114.54-0.66797 1.0664 0.26562 3.0664 0.92969 8.1328zm118.54-686.54c-23.602-2.5352-29.602-1.6016-30.801 8.668-4.2305 26.047-5.082 52.535-2.5312 78.801l93.332-6.2656c-1.1992-29.602 7.4648-56 2-85.734l-40.934 2.9336-6 75.066h-7.1992c-19.332-20.535-1.1992-48.402-7.8672-73.469zm210.4 105.07c5.25-37.062 6.0117-74.621 2.2695-111.87-1.8906-5.0781-6.2812-8.8164-11.602-9.8633-20.754-1.0156-41.504 2.0664-61.066 9.0664-2 22.801-4.5352 44.934-5.4648 66.668-0.66797 18 0 18.133 23.332 20l11.602-77.066c15.332 1.6016 14.535 10.801 13.332 20-1.5117 21.957-2.9766 43.91-4.3984 65.867zm-379.46-22.531c2.5352-16.801 6.1328-36.266 8.2656-55.867 0.66797-6-1.332-17.465-3.6016-17.867h0.003906c-13.605-2.3125-27.418-3.1641-41.203-2.5312-10.133 0-13.332 9.7344-13.332 18.133-2.3984 28-4.1328 56-5.8672 84 0 1.8672 2.2656 3.8672 3.332 5.6016zm145.6 806.4-13.332 86.535 48.133 0.93359c-1.1992-31.867 17.734-59.602 10-93.332zm-76.535-803.07c10.516 0.86328 21.086 0.86328 31.602 0 5.2969-1.2344 9.6719-4.9609 11.73-10 3.1992-23.332 10.398-46.535 4.8008-72.801l-41.465 1.4648zm-125.46 902.4c13.332-37.332 20.668-76.266 17.199-93.332v-0.003906c-7.7461-1.3398-15.633-1.6992-23.469-1.0664-5.4648 1.0664-13.332 6.1328-14.266 10.668-5.0664 25.602-8.3984 51.602-12.668 80zm303.6-109.87-40.668 2.9336c12 33.465-10.801 63.199-2.1328 96l31.332-2zm-186.67 105.07c5.6016-30.398 15.734-56.801 10.266-87.734l-32.535 0.80078c-1.8672 30.535-15.867 56.934-13.332 88.266zm-76.934-86.668c-2 32.535-15.332 60.535-15.465 93.332l32.668-2.9336 19.465-89.734zm266.67-901.87c1.4648 29.734-4.3984 56.398 0 82.535 30.535 5.6016 32.266 4.2656 34.934-22.801 1.0664-11.465 2.9336-22.934 3.4648-34.398v-30.801zm35.602 977.87 10.266-92.398-40-0.80078c16.668 32.668-6.3984 63.332 1.8672 96.934zm-201.46 5.7344c24.668 2.9336 24.934 2.9336 29.199-16.266 3.6016-16 7.0664-32.133 9.6016-48.398l-0.003907-0.003907c0.41797-7.918 0.15234-15.859-0.80078-23.734l-30.266 5.1992zm-55.336-972.13c-1.8672 15.465-3.4648 27.602-4.668 40-1.1992 12.398-2.1328 25.332-3.332 38.934h31.867l1.4648-81.066zm283.46 872c2.668 30.535-9.0664 57.332-4.1328 87.066l25.199-3.0664h0.003906c5.75-27.992 6.7422-56.75 2.9297-85.066zm-154.66-347.34c3.7031-8.4336 5.8711-17.465 6.3984-26.664-0.66797-5.1992-8.9336-11.465-14.934-13.332-3.1992-0.80078-10.934 6.3984-13.332 11.465-4.3984 14.934 5.332 21.465 21.867 28.531z"/><path d="m578.54 345.2c4.0508 6.0195 7.5312 12.402 10.398 19.066 0 1.332-6.668 7.1992-8.1328 6.5352-4.6797-2.0703-8.4961-5.6992-10.801-10.266-1.0664-2.668 3.332-7.3359 8.5352-15.336z"/><path d="m760 259.6c15.199-9.6016 15.465-9.4648 20.934 7.332-11.469 1.4648-11.469 1.4648-20.934-7.332z"/><path d="m533.33 303.46c-6.2656 3.4648-10.668 7.4648-12.133 6.5352-3.957-3.0938-7.457-6.7266-10.398-10.801 2.9336-2.1328 6.5352-6.5352 8.5352-5.8672h-0.003907c5.1211 2.7031 9.8359 6.1133 14 10.133z"/><path d="m669.87 281.2c3.1758 4.5781 5.7305 9.5547 7.5977 14.801 0 1.4648-6.5352 6.3984-8.1328 5.7344-4.2148-2.6992-8.0312-5.9727-11.332-9.7344z"/><path d="m711.73 351.73c4.668-3.8672 8-8.3984 9.8672-7.8672 3.8984 1.9922 7.4219 4.6523 10.398 7.8672-2.2656 2.668-4.9336 7.7344-6.8008 7.4648-4.8594-1.75-9.4062-4.2695-13.465-7.4648z"/><path d="m584.54 247.07c5.8672-3.8672 10.535-7.8672 11.332-7.1992 3.668 3.3672 6.7344 7.3359 9.0664 11.734 0 0-4.9336 5.7344-6 5.1992-5.0742-2.8203-9.8945-6.0781-14.398-9.7344z"/><path d="m646.67 490.27c3.9297 4.668 7.4531 9.6641 10.531 14.934 0 1.1992-4.5352 6.668-4.9336 6.3984v0.003906c-4.6055-2.1953-8.7617-5.2266-12.266-8.9336-0.80078-0.93359 3.1992-6 6.668-12.402z"/><path d="m659.33 758.27c3.7344 5.8672 8.3984 9.8672 7.8672 13.332-0.53516 3.4648-6.1328 5.8672-9.4648 8.668-2.9336-3.4648-7.7344-6.8008-8.1328-10.535-0.40234-3.7305 5.0664-6.5312 9.7305-11.465z"/><path d="m640 714.93c-6 3.332-10.398 7.332-12 6.3984-3.832-2.9492-7.2031-6.4531-10-10.398 2.668-2.3984 6.5352-7.4648 7.8672-6.8008 5.1328 3.0117 9.8789 6.6367 14.133 10.801z"/></svg></div>';
  // Gate 3 (Picture the charge) closes with its own drawing: a framed picture.
  var GATE3_ART = '<div class="gate-art-wrap"><svg class="gate-art" viewBox="217 113 766 975" role="img" aria-label="A framed picture of an eye, drawn in line art" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="m983.02 199.55c0-23.719-9.6094-45.234-25.031-60.938-0.1875-0.1875-0.23438-0.46875-0.42188-0.65625s-0.46875-0.23438-0.65625-0.42188c-15.703-15.469-37.219-25.031-60.938-25.031h-591.98c-23.719 0-45.234 9.6094-60.938 25.031-0.1875 0.1875-0.46875 0.23438-0.65625 0.42188s-0.23438 0.46875-0.42188 0.65625c-15.469 15.703-25.031 37.219-25.031 60.938v800.9c0 23.719 9.6094 45.234 25.031 60.938 0.1875 0.1875 0.23438 0.46875 0.42188 0.65625s0.46875 0.23438 0.65625 0.42188c15.703 15.469 37.219 25.031 60.938 25.031h591.98c23.719 0 45.234-9.6094 60.938-25.031 0.1875-0.1875 0.46875-0.23438 0.65625-0.42188s0.23438-0.46875 0.42188-0.65625c15.469-15.703 25.031-37.219 25.031-60.938zm-69.609 793.69v-786.47l29.578-29.578c3.2812 6.7969 5.25 14.344 5.25 22.359v800.9c0 8.0625-1.9688 15.562-5.25 22.359zm-591.98-10.219v-766.03h557.16v504.89h-34.828c-28.781 0-52.219 23.438-52.219 52.219v34.828c0 9.6094-7.8281 17.391-17.391 17.391-14.109 0-27.234 5.5312-36.703 15.234-9.9844 9.75-15.516 22.922-15.516 37.031v17.391c0 9.6094-7.8281 17.391-17.391 17.391-4.6406 0-8.9531-1.7812-12.375-5.3438-3.2344-3.1406-5.0156-7.4531-5.0156-12.094v-34.828c0-28.781-23.438-52.219-52.219-52.219-14.109 0-27.234 5.5312-36.703 15.234-9.9844 9.75-15.516 22.922-15.516 37.031v17.391c0 9.6094-7.8281 17.391-17.391 17.391-14.109 0-27.234 5.5312-36.703 15.234-9.9844 9.75-15.516 22.922-15.516 37.031v34.828zm-64.406 39.797c-3.2812-6.7969-5.25-14.344-5.25-22.359v-800.9c0-8.0625 1.9688-15.562 5.25-22.359l29.578 29.578v786.47zm290.76-74.578c0-4.6406 1.7812-8.9531 5.3438-12.375 3.1406-3.2344 7.4531-5.0156 12.094-5.0156 28.781 0 52.219-23.438 52.219-52.219v-17.391c0-4.6406 1.7812-8.9531 5.3438-12.375 3.1406-3.2344 7.4531-5.0156 12.094-5.0156 9.6094 0 17.391 7.8281 17.391 17.391v34.828c0 14.109 5.5312 27.234 15.234 36.703 9.75 9.9844 22.922 15.516 37.031 15.516 28.781 0 52.219-23.438 52.219-52.219v-17.391c0-4.6406 1.7812-8.9531 5.3438-12.375 3.1406-3.2344 7.4531-5.0156 12.094-5.0156 28.781 0 52.219-23.438 52.219-52.219v-34.828c0-9.6094 7.8281-17.391 17.391-17.391h34.828v226.36h-330.79v-34.828zm348.19-800.9c8.0625 0 15.562 1.9688 22.359 5.25l-29.578 29.578h-577.55l-29.578-29.578c6.7969-3.2812 14.344-5.25 22.359-5.25zm-591.94 905.34c-8.0625 0-15.562-1.9688-22.359-5.25l29.578-29.578h577.55l29.578 29.578c-6.7969 3.2812-14.344 5.25-22.359 5.25zm295.97-400.45c126.94 0 226.36-53.531 226.36-121.87 0-68.344-99.422-121.87-226.36-121.87s-226.36 53.531-226.36 121.87c0 68.344 99.422 121.87 226.36 121.87zm52.219-156.71c0 28.781-23.438 52.219-52.219 52.219s-52.219-23.438-52.219-52.219 23.438-52.219 52.219-52.219 52.219 23.438 52.219 52.219zm-126.32-45.047c-8.0625 13.172-12.938 28.5-12.938 45.047 0 48 39.047 87.047 87.047 87.047s87.047-39.047 87.047-87.047c0-16.547-4.875-31.875-12.938-45.047 71.672 14.438 117.42 48.516 117.42 79.875 0 41.156-78.656 87.047-191.53 87.047s-191.53-45.891-191.53-87.047c0-31.359 45.75-65.391 117.42-79.875zm56.719-94.219v-69.656c0-9.6094 7.7812-17.391 17.391-17.391s17.391 7.7812 17.391 17.391v69.656c0 9.6094-7.7812 17.391-17.391 17.391s-17.391-7.7812-17.391-17.391zm54.328 32.719c-6.7969-6.7969-6.7969-17.812 0-24.609l49.219-49.219c6.7969-6.7969 17.812-6.7969 24.609 0s6.7969 17.812 0 24.609l-49.219 49.219c-3.4219 3.4219-7.875 5.1094-12.328 5.1094s-8.9062-1.6875-12.328-5.1094zm-147.74-49.266c-6.7969-6.7969-6.7969-17.812 0-24.609s17.812-6.7969 24.609 0l49.219 49.219c6.7969 6.7969 6.7969 17.812 0 24.609-3.4219 3.4219-7.875 5.1094-12.328 5.1094s-8.9062-1.6875-12.328-5.1094l-49.219-49.219zm110.81 382.18c-83.391 0-163.22-22.641-219-62.156-7.8281-5.5312-9.7031-16.406-4.125-24.281 5.5312-7.8281 16.406-9.7031 24.281-4.125 50.016 35.438 122.53 55.734 198.89 55.734 76.359 0 148.87-20.344 198.89-55.781 7.875-5.5781 18.703-3.7031 24.281 4.125s3.7031 18.703-4.125 24.281c-55.781 39.516-135.61 62.156-219 62.156z"/></svg></div>';
  // Gate 4 closes with its own drawing: a diamond with arrows pointing out to the corners.
  var GATE4_ART = '<div class="gate-art-wrap"><svg class="gate-art" viewBox="37 38 1125 1125" role="img" aria-label="A diamond with arrows pointing out to the four corners, drawn in line art" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="m906.79 600c0-23.531-9.1406-45.656-25.781-62.25l-218.76-218.76c-34.359-34.266-90.141-34.359-124.5 0l-218.72 218.76c-16.688 16.594-25.828 38.719-25.828 62.25s9.1406 45.656 25.781 62.25l218.72 218.76c17.156 17.156 39.703 25.734 62.25 25.734s45.094-8.5781 62.25-25.734l218.72-218.72c16.734-16.688 25.875-38.766 25.875-62.297zm-78.844 9.1875-218.72 218.72c-5.0625 5.1094-13.406 5.0625-18.469 0l-218.72-218.76c-3.3281-3.2344-3.8438-7.125-3.8438-9.1406 0-2.0156 0.46875-5.9062 3.8438-9.2344l218.72-218.72c2.5312-2.5312 5.9062-3.8438 9.2344-3.8438 3.3281 0 6.7031 1.2656 9.2344 3.8438l218.72 218.76c3.3281 3.2812 3.8438 7.1719 3.8438 9.1875s-0.51562 5.9062-3.8438 9.1875z"/> <path d="m72.469 248.26c0.84375 0.046876 1.7344 0.09375 2.5312 0.09375 19.547 0 36.047-15.141 37.406-34.969l3.0469-44.906 141.94 141.94c7.3594 7.3594 16.922 11.016 26.531 11.016s19.219-3.6562 26.531-10.969c14.672-14.672 14.672-38.344 0-53.016l-141.98-141.98 44.906-3.0469c20.719-1.4062 36.281-19.312 34.922-39.938-1.4062-20.625-19.219-36.047-39.938-34.875l-127.22 8.625c-18.703 1.2656-33.609 16.172-34.922 34.875l-8.625 127.22c-1.4062 20.672 14.203 38.531 34.875 39.938z"/> <path d="m1127.5 951.74c-20.109-1.0312-38.531 14.203-39.938 34.875l-3.0469 44.906-141.94-141.94c-14.672-14.672-38.344-14.672-53.016 0-14.672 14.672-14.672 38.344 0 53.016l141.94 141.94-44.906 3.0469c-20.719 1.4062-36.281 19.266-34.922 39.938 1.3594 19.828 17.812 34.969 37.406 34.969 0.84375 0 1.7344-0.046876 2.5312-0.09375l127.22-8.625c18.703-1.2656 33.609-16.172 34.922-34.875l8.625-127.22c1.4062-20.672-14.203-38.531-34.875-39.938z"/> <path d="m916.08 321.42c9.6094 0 19.219-3.6562 26.531-10.969l141.94-141.94 3.0469 44.906c1.3594 19.781 17.859 34.969 37.406 34.969 0.84375 0 1.7344-0.046875 2.5312-0.09375 20.719-1.4062 36.281-19.266 34.922-39.938l-8.625-127.22c-1.2656-18.703-16.219-33.609-34.922-34.875l-127.22-8.625c-20.344-1.2656-38.531 14.203-39.938 34.875s14.203 38.531 34.922 39.938l44.906 3.0469-141.94 141.94c-14.672 14.672-14.672 38.344 0 53.016 7.2656 7.3125 16.828 10.969 26.438 10.969z"/> <path d="m257.39 889.6-141.94 141.94-3.0469-44.906c-1.4062-20.625-19.453-35.812-39.938-34.875-20.719 1.4062-36.281 19.266-34.922 39.938l8.625 127.22c1.2656 18.703 16.219 33.609 34.922 34.875l127.22 8.625c0.84375 0.046876 1.7812 0.09375 2.5781 0.09375 19.547 0 36.047-15.141 37.406-34.969 1.4062-20.672-14.203-38.531-34.922-39.938l-44.906-3.0469 141.94-141.94c14.672-14.672 14.672-38.344 0-53.016-14.625-14.625-38.344-14.672-53.016 0z"/></svg></div>';
  var SIGNPOST_ART = QA.SIGNPOST_ART;
  var CHARGE_ART = QA.CHARGE_ART;
  var NOTEBOOK_ART = QA.NOTEBOOK_ART;
  var SCISSORS_ART = QA.SCISSORS_ART;

  function gate1(P) {
    var a = P.g1;
    var n = a.asks.length;
    var lis = a.asks.map(function (q, i) { return '<li data-t="' + (i + 1) + '" hidden>' + q + '</li>'; }).join('');
    return {
      prompt: P.n, eyebrow: "", name: P.name, aim: !!a.aim,
      steps: [
        (a.aim ? '<p class="lead rule">' + a.aim + '</p>' + (a.aimNote ? '<p>' + a.aimNote + '</p>' : '') : null),
        (a.title ? '<div><p class="eyebrow">Gate 1</p><h3 class="step-title">' + a.title + ' <span class="time-hint">10 minutes</span></h3></div>' : '') +
        '<p class="lead rule">' + a.lead + '</p>' +
        '<div class="reserve">' +
        '<div class="asklist" data-t="1" hidden><ul>' + lis + '</ul></div>' +
        '<div data-t="' + n + '" hidden>' +
        '<div class="seq" style="--d:0.5s">' +
        stuck("s-g1a", a.stuck) +
        '</div>' +
        '</div>' +
        '</div>' +
        GATE_ART
      ].filter(function (x) { return x !== null; })
    };
  }

  // "Want more to work with?": the old "What remains" questions, now a tap-to-open link on Gate 2's first screen.
  // Shown all at once (no step taps), so the starters are plain lines rather than the tap-by-tap asks().
  function gate2more(P) {
    var c = P.g1c;
    if (!c) return '';
    return '<details class="note more seq" style="--d:0.5s"><summary>Want more to work with?</summary>' +
      '<p>' + c.intro + '</p>' +
      '<p class="ask">' + c.starters.map(function (q) { return '<span class="q">' + q + '</span>'; }).join('') + '</p>' +
      stuck("s-g2more", c.stuck) +
      '</details>';
  }

  var GATE2_OPENERS = [
  "Read over your writing and <u><em>underline the detail</em></u> that pulls at you most. That detail carries <strong>your charge</strong>: the emotional current that makes it matter to you.",
  "Read back over your writing and <u><em>underline the detail</em></u> that pulls at you most. That detail carries <strong>your charge</strong>: the emotional current that makes it matter to you.",
  "Look back at what you wrote. <u><em>Underline the one detail</em></u> you keep returning to. That\u2019s where <strong>your charge</strong> lives: the emotional current behind why this matters.",
  "Reread your writing and <u><em>underline the detail</em></u> that stirs something in you, even if you can\u2019t say why. <strong>Your charge</strong> is in there: the emotional current that makes this matter to you.",
  "Go back through what you wrote and <u><em>underline the line or detail</em></u> that your eye keeps landing on. It carries <strong>your charge</strong>, the feeling that makes it yours.",
  "Read it again, slowly. <u><em>Underline the detail</em></u> that makes you pause. That pause is <strong>your charge</strong>: the emotional current that makes it matter to you.",
  "Scan your writing for the detail that feels most alive, or the one you almost left out. <u><em>Underline it.</em></u> <strong>Your charge</strong> is hiding there: the emotional current that makes it matter to you.",
  "Reread your writing and <u><em>underline the detail</em></u> that pulls at you most. That\u2019s <strong>your charge</strong>.",
  "<u><em>Underline the detail</em></u> you keep returning to. That\u2019s where <strong>your charge</strong> lives.",
  "Find the detail that makes you pause. <u><em>Underline it.</em></u> That\u2019s <strong>your charge</strong>.",
  "<u><em>Underline the one detail</em></u> that feels most alive. It carries <strong>your charge</strong>.",
  "Reread, then <u><em>underline the detail</em></u> that stirs you most. That\u2019s <strong>your charge</strong>.",
  "<u><em>Underline what pulls at you.</em></u> That\u2019s <strong>your charge</strong>.",
  "Look for the detail you almost left out. <u><em>Underline it.</em></u> <strong>Your charge</strong> is probably there.",
  "<u><em>Underline the detail</em></u> that feels most yours. That\u2019s <strong>your charge</strong>."
];

  function gate2opener(P) {
    var n = (P && P.n) || 1;
    var i = n - 1, L = 7; // the first seven are the full versions; after that only the shorter ones cycle
    if (i >= GATE2_OPENERS.length) i = L + ((i - L) % (GATE2_OPENERS.length - L));
    return GATE2_OPENERS[i];
  }

  var GATE2B = [
  {
    "h": "Follow where it points",
    "p": "A detail is often a doorway to something larger. Let your mind follow it a little further.",
    "a": "Picture the detail you underlined as a <strong>signpost</strong>.",
    "q": "What is it pointing you toward?",
    "s": "Underneath this detail is\u2026"
  },
  {
    "h": "Where does it lead?",
    "p": "Small details often point to something bigger. Give yours a little room to lead.",
    "a": "Imagine the detail you underlined as a <strong>signpost</strong>.",
    "q": "Which way does it point?",
    "s": "This detail makes me think of\u2026"
  },
  {
    "h": "Read the signpost",
    "p": "The detail you underlined is a clue. Stay with it a moment and see what it opens onto.",
    "a": "Picture it as a <strong>signpost</strong>.",
    "q": "Where does it take you?",
    "s": "What I keep coming back to is\u2026"
  },
  {
    "h": "Take one more step",
    "p": "Your detail may be pointing past itself. Let your mind wander a little further down the road.",
    "a": "See your underlined detail as a <strong>signpost</strong>.",
    "q": "What\u2019s the next place it points to?",
    "s": "If I followed this detail, I\u2019d end up at\u2026"
  },
  {
    "h": "What\u2019s behind it?",
    "p": "Details are often the tip of something. Let yours lead you a little deeper.",
    "a": "Picture the detail you underlined as a <strong>signpost</strong>.",
    "q": "What does it want you to notice next?",
    "s": "Behind this detail is\u2026"
  },
  {
    "h": "Where does it lead?",
    "p": "A detail is often a doorway to something larger. Let your mind follow it a little further.",
    "a": "Picture it as a <strong>signpost</strong>.",
    "q": "What does it make you think of next?",
    "s": "Underneath this detail is\u2026"
  },
  {
    "h": "Read the signpost",
    "p": "Small details often point to something bigger. Give yours a little room to lead.",
    "a": "Picture the detail you underlined as a <strong>signpost</strong>.",
    "q": "What is it pointing you to?",
    "s": "This detail makes me think of\u2026"
  },
  {
    "h": "Follow the detail",
    "p": "Let your mind follow it a little further.",
    "a": "Picture your detail as a <strong>signpost</strong>.",
    "q": "What is it pointing toward?",
    "s": "Underneath this detail is\u2026"
  },
  {
    "h": "Let it lead",
    "p": "Let your mind follow it a little further.",
    "a": "Picture the detail as a <strong>signpost</strong>.",
    "q": "What does it remind you of?",
    "s": "This detail makes me think of\u2026"
  },
  {
    "h": "Follow the detail",
    "p": "Small details often point to something bigger.",
    "a": "Picture it as a <strong>signpost</strong>.",
    "q": "What does it make you think of next?",
    "s": "Behind this detail is\u2026"
  },
  {
    "h": "Let it lead",
    "p": "Give it a little room to lead.",
    "a": "Picture it as a <strong>signpost</strong>.",
    "q": "Where does it take you?",
    "s": "What I keep coming back to is\u2026"
  }
];

  function gate2b(P) {
    var n = (P && P.n) || 1, i = n - 1, L = 7; // seven full versions, then the shorter ones cycle
    if (i >= GATE2B.length) i = L + ((i - L) % (GATE2B.length - L));
    return GATE2B[i];
  }

  var GATE2_NOTES = [
    "Note what it points toward. A word, an image or a memory is enough.",
    "Jot down where the detail leads, even if it\u2019s only a word or an image.",
    "Write down what the signpost points to. A word, an image or a memory will do.",
    "Capture where it points, on the same page as your other writing. A word is enough.",
    "Add whatever it points toward to your writing, even if it\u2019s just a few words."
  ];
  function gate2note(P) { var n = (P && P.n) || 1; return GATE2_NOTES[(n - 1) % GATE2_NOTES.length]; }

  function gate2(P) {
    return {
      eyebrow: "Gate 2", name: "Deepen the charge",
      steps: [
        '<p>' + gate2opener(P) + '</p>' +
        gate2more(P) +
        GATE_ART.replace('class="gate-art"', 'class="gate-art fixed-art time-art"'),
        '<h3>' + gate2b(P).h + '</h3>' +
        SIGNPOST_ART +
        '<p>' + gate2b(P).p + '</p>' +
        '<div class="reserve">' +
        asks([gate2b(P).a, '<em>' + gate2b(P).q + '</em>']) +
        withTap(3, '<p>' + gate2note(P) + '</p>' + stuck("s-g2", "Stay with the detail itself. What does it smell like, sound like, or feel like in your hands?")) +
        '</div>'
      ]
    };
  }

  var GATE3H = [
  {
    "h": "Choose a way in",
    "p": "Now <strong>turn your charge into an image</strong> for your quilt. Pick any starting point below."
  },
  {
    "h": "Pick a place to start",
    "p": "Now <strong>turn your charge into an image</strong> for your quilt. Your writing has plenty to work from."
  },
  {
    "h": "Where do you want to begin?",
    "p": "Now <strong>shape your charge into an image</strong> for your quilt. Somewhere in your writing is something to start with."
  },
  {
    "h": "Find a way in",
    "p": "Now <strong>turn your charge into an image</strong> for your quilt. Choose one way to begin."
  },
  {
    "h": "Start with what you have",
    "p": "Now <strong>build an image of your charge</strong> for your quilt. Use the words, images and details in your writing."
  },
  {
    "h": "Which way feels right today?",
    "p": "Now <strong>turn your charge into an image</strong> for your quilt. Any of these can get you started."
  },
  {
    "h": "Three ways to start",
    "p": "Now <strong>turn your charge into an image</strong> for your quilt. Pick the one that feels easiest."
  },
  {
    "h": "Choose a way in",
    "p": "<strong>Turn your charge into an image</strong> for your quilt."
  },
  {
    "h": "Pick a place to start",
    "p": "<strong>Shape your charge into an image</strong> for your quilt. Choose whichever feels easiest."
  },
  {
    "h": "Where to begin?",
    "p": "<strong>Build an image of your charge</strong> for your quilt. Start with whatever your writing gives you."
  }
];

  var GATE3_THING = ["Which image in your writing holds your charge best? Sketch it or imagine it.", "Is there an object in your writing that holds your charge? Sketch it or picture it.", "Pick the object or image that feels most loaded. Draw it or hold it in your mind."], GATE3_FABRIC = ["Look through what you have. Which one feels like it can carry your charge? What about it: color, texture, pattern?", "Spread out some fabrics. Which one feels right for your charge? What is it about it?", "Handle your fabrics for a minute. Which one gets your attention, and why?"], GATE3_WORD = ["Choose a specific, personal word you wrote or that comes to mind. What makes this <em>your</em> word? How would you stitch it: what style, what size, what color?", "Pick a word from your writing that matters to you. How would it look in thread?", "Find a word that holds your charge. What size, color and style would you stitch it in?"], GATE3_STUCK = ["Scan your writing again for a second detail that belongs with the first. Picture the two together.", "Pick a second detail that might sit next to the first. What do they look like together?", "Look for another detail that matches the first. Imagine them side by side.", "Choose two details and picture them in the same spot on your quilt."];

  function gate3h(P) {
    var n = (P && P.n) || 1, i = n - 1, L = 7; // seven full versions, then the shorter ones cycle
    if (i >= GATE3H.length) i = L + ((i - L) % (GATE3H.length - L));
    return GATE3H[i];
  }

  function pick3(list, P) { return list[(((P && P.n) || 1) - 1) % list.length]; }

  function gate3(P) {
    return {
      eyebrow: "Gate 3", name: "Picture the charge",
      steps: [
        '<p>' + gate3h(P).p + '</p>' +
        (P.g3 && P.g3.note ? '<p>' + P.g3.note + '</p>' : '') +
        '<div class="ways">' +
        '<details class="seq" style="--d:0.5s" name="way"><summary>Start with a thing</summary><p>' + pick3(GATE3_THING, P) + '</p></details>' +
        '<details class="seq" style="--d:1.1s" name="way"><summary>Start with your fabrics</summary><p>' + pick3(GATE3_FABRIC, P) + '</p></details>' +
        '<details class="seq" style="--d:1.7s" name="way"><summary>Start with a word</summary><p>' + pick3(GATE3_WORD, P) + '</p></details>' +
        '</div>' +
        '<div class="seq" style="--d:2.3s">' +
        stuck("s-g3", GATE3_STUCK[((P.n || 1) - 1) % GATE3_STUCK.length]) +
        '</div>' +
        GATE3_ART
      ]
    };
  }

  var GATE4_INTRO = [
  "This matrix helps you reflect on how <strong>personal</strong> and how <strong>strong</strong> your image is. <strong>Tap a corner</strong> to see how each one works.",
  "This matrix shows how <strong>personal</strong> and how <strong>strong</strong> your image is. <strong>Tap a corner</strong> to see what each one means.",
  "Use this matrix to check how <strong>personal</strong> and how <strong>strong</strong> your image feels. <strong>Tap a corner</strong> to see how each one works.",
  "Here\u2019s a way to test your image: how <strong>personal</strong> is it, and how <strong>strong</strong>? <strong>Tap a corner</strong> to see what each corner means.",
  "Your image sits somewhere on this matrix, between <strong>personal</strong> and universal and between <strong>strong</strong> and faint. <strong>Tap a corner</strong> to find out what each means.",
  "Let\u2019s see where your image lands. <strong>Tap a corner</strong> to learn what each part of the matrix means.",
  "Where does your image fall on the matrix?",
  "Check your image against the matrix."
];

  var GATE4_ASK = ["Where does your image currently land?", "Where does your image land right now?", "Which corner is it closest to?", "Where do you think your image sits?"], GATE4_HEAD = ["Does your image want to move to another part of the matrix?", "Does your image want to move?", "Would your image like to be somewhere else on the matrix?", "Should your image shift to another corner?", "Is there a corner you\u2019d like it to move toward?", "Does your image feel finished, or does it want to move?"], GATE4_PERSONAL = ["To move toward <strong>Personal</strong>, add a detail only you would know", "To make it more <strong>Personal</strong>, add a detail only you would know", "For more <strong>Personal</strong>, add something only you would notice", "To move toward <strong>Personal</strong>, add a detail that\u2019s yours alone"], GATE4_STRONG = ["To move toward <strong>Strong</strong>, return to your {link} and find a detail that holds more of your charge", "To make it <strong>Stronger</strong>, go back to your {link} and find a detail that holds more of your charge", "For more <strong>Strong</strong>, return to your {link} and pick a detail that carries more charge", "To move toward <strong>Strong</strong>, look in your {link} for a detail that holds more charge"], GATE4_DONE = ["If it holds up where it is, it\u2019s time to start sewing", "If it already feels right where it is, you\u2019re ready to sew", "If it feels right where it is, go ahead and start sewing", "If nothing needs to change, it\u2019s time to sew"];

  function gate4intro(P) {
    var n = (P && P.n) || 1, i = n - 1, L = 6; // six full versions, then the shorter ones cycle
    if (i >= GATE4_INTRO.length) i = L + ((i - L) % (GATE4_INTRO.length - L));
    return GATE4_INTRO[i];
  }

  function g4pick(list, P, stride) { return list[((((P && P.n) || 1) - 1) * stride) % list.length]; }

  function gate4(P) {
    return {
      eyebrow: "Gate 4", name: "Test the charge",
      steps: [
        '<p>' + gate4intro(P) + '</p>' +
        MATRIX +
        '<p class="ask noline">' + g4pick(GATE4_ASK, P, 1) + '</p>',

        '<h3>' + g4pick(GATE4_HEAD, P, 1) + '</h3>' +
        '<div class="reserve">' +
        '<ul class="iconlist">' + '<li class="seq" data-t="1" hidden style="--d:0s">' + g4pick(GATE4_PERSONAL, P, 1) + '</li>' + '<li class="seq" data-t="2" hidden style="--d:0s">' + g4pick(GATE4_STRONG, P, 3).replace('{link}', '<a href="#" class="steplink" data-g="0" data-s="' + (P.g1.aim ? 1 : 0) + '">writing</a>') + '</li>' + (P.g4.sizeNote ? '<li class="seq" data-t="3" hidden style="--d:0s">' + P.g4.sizeNote + '</li>' : '') +
        '<li class="seq" data-t="3" hidden style="--d:0s">' + g4pick(GATE4_DONE, P, 1) + '</li>' + '</ul>' +
        (P.g4.collapse ? '<details class="seq ex-fold" data-t="4" hidden style="--d:0s"><summary>Want to see an example?</summary>' : '<div class="seq" data-t="4" hidden style="--d:0s">') + '<div class="example-card"><div class="ex-top"><p>' + P.g4.exampleTop + '</p></div><div class="ex-bottom"><p>' + P.g4.exampleBottom + '</p></div></div>' + (P.g4.collapse ? '</details>' : '</div>') +
        '</div>' +
        GATE4_ART
      ]
    };
  }

  function closing(P) {
    return {
      eyebrow: "All gates completed", name: "Time to sew!", closing: true,
      steps: [
        '<p class="big">' + (P.closing && P.closing.line ? P.closing.line : 'Add your ' + P.subject + ' image to your quilt.') + '</p>' +
        '<p>' + (P.closing && P.closing.note ? P.closing.note + ' ' : '') + (P.closing && P.closing.guide ? P.closing.guide : 'Keep your charge in mind as you sew, and look for chances to heighten the charge even more.') + '</p>'
      ]
    };
  }

  QA.buildGates = function (P) {
    if (P.placeholder) {
      return [{
        prompt: P.n, eyebrow: "", name: "Coming soon",
        steps: ['<p>This prompt has not been written yet. This page is a placeholder.</p>']
      }];
    }
    return [gate1(P), gate2(P), gate3(P), gate4(P), closing(P)];
  };
})();
