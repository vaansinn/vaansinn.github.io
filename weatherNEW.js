(function() {
            var APPID = "fa7b25f01dd40c55545750815ddaac5e"; //APPID from OpenWeatherMap.org
            function init() {
                tableau.initCallback();
            }
            function shutdown() {
                tableau.shutdownCallback();
            }
            //returns a URL for 5 day forecast for given city from the OpenWeatherMap API
            function buildUrl(cityid) {
                var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=' + encodeURIComponent(cityid.toString()) + "&cnt=5&units=metric" + "&APPID=" + APPID;
                return url;
            }
            var myConnector = tableau.makeConnector();
            myConnector.getColumnHeaders = function() {
                //setup field names and types to store weather data
                var fieldNames = ['COUNTRY', 'CITY ID', 'CITY', 'DAYTEMP', 'MINTEMP', 'MAXTEMP', 'NIGHTTEMP', 'EVETEMP', 'MORNTEMP', 'PRESSURE', 'HUMIDITY', 'DATE', 'MAIN', 'DESCRIPTION', 'ICON', 'SPEED', 'DEGREES', 'CLOUD', 'LAT', 'LON'];
                var fieldTypes = ['string', 'float', 'string', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'float', 'date', 'string', 'string', 'string', 'float', 'float', 'float', 'float', 'float'];
                tableau.headersCallback(fieldNames, fieldTypes);
            }
            myConnector.getTableData = function(lastRecordToken) {
                if (!tableau) {
                    alert("weatherwebconnect getColumnHeaders- tableau NOT defined!");
                    return;
                }
                //tableau.log("weatherwebconnect - getTableData connectionData=" + tableau.connectionData);
                //tableau.log("weatherwebconnect - getTableData lastRecordToken=" + lastRecordToken);
                //country id selected by user
                var country = tableau.connectionData;
                //define list of top 300 city ids for OpenWeatherMap
                if (country == "GB") {
                    var cityids = [2633352, 2633373, 2633485, 2633521, 2633551, 2633563, 2633691, 2633708, 2633810, 2633858, 2633883, 2633948, 2633954, 2633976, 2634021, 2634032, 2634202, 2634308, 2634491, 2634552, 2634578, 2634677, 2634686, 2634715, 2634739, 2634853, 2634864, 2634873, 2634887, 2634910, 2635062, 2635281, 2635427, 2635650, 2635703, 2636177, 2636276, 2636389, 2636432, 2636465, 2636484, 2636486, 2636531, 2636616, 2636619, 2636663, 2636769, 2636841, 2636876, 2636882, 2636910, 2636940, 2637126, 2637142, 2637329, 2637343, 2637433, 2637487, 2637546, 2637627, 2637752, 2637802, 2637891, 2638077, 2638324, 2638419, 2638664, 2638671, 2638678, 2638785, 2638867, 2638960, 2638978, 2639022, 2639093, 2639272, 2639447, 2639506, 2639557, 2639563, 2639577, 2639660, 2639866, 2639897, 2639912, 2639928, 2639996, 2640101, 2640106, 2640194, 2640354, 2640358, 2640677, 2640681, 2640729, 2641022, 2641157, 2641170, 2641181, 2641224, 2641267, 2641430, 2641595, 2641673, 2641689, 2641690, 2641810, 2641843, 2642189, 2642214, 2642465, 2642593, 2642607, 2642705, 2643044, 2643097, 2643116, 2643123, 2643179, 2643186, 2643266, 2643339, 2643490, 2643567, 2643697, 2643741, 2644100, 2644204, 2644210, 2644319, 2644411, 2644487, 2644547, 2644597, 2644652, 2644660, 2644668, 2644688, 2644726, 2644737, 2644972, 2645313, 2645418, 2645605, 2645724, 2645753, 2645889, 2646032, 2646057, 2646088, 2646274, 2646327, 2646458, 2646504, 2646557, 2646807, 2646826, 2646867, 2646914, 2647057, 2647074, 2647138, 2647317, 2647349, 2647356, 2647400, 2647428, 2647461, 2647632, 2647639, 2647793, 2647948, 2647984, 2648026, 2648063, 2648182, 2648187, 2648208, 2648272, 2648404, 2648405, 2648438, 2648579, 2648657, 2648773, 2649258, 2649322, 2649578, 2649660, 2649672, 2649692, 2649723, 2649800, 2649808, 2650096, 2650225, 2650278, 2650396, 2650405, 2650497, 2650628, 2650657, 2650732, 2650752, 2650839, 2651123, 2651286, 2651347, 2651495, 2651500, 2651513, 2651654, 2651715, 2652002, 2652053, 2652221, 2652381, 2652513, 2652618, 2652696, 2652698, 2652885, 2652974, 2653075, 2653086, 2653137, 2653144, 2653224, 2653225, 2653228, 2653232, 2653261, 2653266, 2653305, 2653584, 2653680, 2653775, 2653822, 2653877, 2653883, 2653941, 2654187, 2654264, 2654308, 2654675, 2654710, 2654715, 2654728, 2654730, 2654755, 2654782, 2654938, 2654993, 2655009, 2655095, 2655138, 2655186, 2655198, 2655237, 2655262, 2655315, 2655351, 2655459, 2655523, 2655603, 2655613, 2655664, 2655672, 2655729, 2655785, 2655882, 2655984, 2656046, 2656070, 2656168, 2656173, 2656192, 2656194, 2656235, 2656281, 2656284, 2656396, 2656406, 2656490, 2656708, 2656719, 2656915, 2656955, 2657030, 2657324, 2657402, 2657540, 2657613, 2657770, 2657780, 2657832, 2657835, 3209584, 3345439, 6691227];
                }
                if (country == "FR") {
                    var cityids = [2967245, 2967421, 2967849, 2967870, 2967917, 2968054, 2968142, 2968176, 2968254, 2968482, 2968529, 2968653, 2968705, 2968748, 2969109, 2969257, 2969284, 2969392, 2969679, 2970072, 2970456, 2970761, 2970777, 2970797, 2970962, 2971041, 2971053, 2971549, 2972049, 2972191, 2972237, 2972284, 2972315, 2972328, 2972444, 2972742, 2972811, 2972893, 2973258, 2973385, 2973495, 2973675, 2973783, 2973841, 2974153, 2974389, 2974681, 2974733, 2975050, 2975446, 2975525, 2975536, 2975758, 2975921, 2976043, 2976179, 2976341, 2976984, 2977246, 2977295, 2977356, 2977821, 2977921, 2978072, 2978179, 2978640, 2979590, 2979783, 2980236, 2980291, 2980340, 2980558, 2980816, 2980916, 2981041, 2981206, 2981280, 2982235, 2982652, 2982681, 2982757, 2983011, 2983276, 2983362, 2983770, 2983990, 2984114, 2984513, 2984701, 2985034, 2986140, 2986495, 2986501, 2986930, 2987271, 2987805, 2987914, 2987967, 2988358, 2988507, 2988621, 2988758, 2989317, 2989460, 2990187, 2990189, 2990265, 2990355, 2990363, 2990440, 2990474, 2990611, 2990612, 2990919, 2990969, 2990970, 2990999, 2991214, 2992017, 2992061, 2992166, 2992292, 2992415, 2992703, 2992771, 2992938, 2993002, 2994048, 2994144, 2994160, 2994393, 2994497, 2994651, 2994798, 2995150, 2995206, 2995387, 2995469, 2995649, 2995750, 2995908, 2996148, 2996514, 2996568, 2996882, 2996944, 2997116, 2997577, 2997803, 2998056, 2998286, 2998324, 2998431, 2998975, 3000192, 3003093, 3003603, 3003737, 3003796, 3003952, 3004630, 3004871, 3005269, 3005866, 3006283, 3006414, 3006767, 3006787, 3007477, 3008218, 3009169, 3009223, 3009824, 3010025, 3012219, 3012621, 3012647, 3012649, 3012834, 3012937, 3013097, 3014078, 3014143, 3014646, 3014728, 3014856, 3015490, 3015689, 3016621, 3016702, 3016830, 3017253, 3017341, 3017910, 3019256, 3019265, 3019897, 3020020, 3020035, 3020062, 3020310, 3020495, 3020810, 3020832, 3020839, 3020850, 3021000, 3021372, 3021411, 3022530, 3022610, 3023141, 3023763, 3023924, 3024066, 3024223, 3024266, 3024297, 3024596, 3024597, 3024635, 3024783, 3025053, 3025055, 3025622, 3025892, 3026033, 3026075, 3026108, 3026141, 3026204, 3026467, 3026613, 3026637, 3027105, 3027422, 3027484, 3027487, 3027883, 3028133, 3028263, 3028542, 3028641, 3028808, 3029030, 3029096, 3029162, 3029227, 3029241, 3029276, 3029931, 3029974, 3030300, 3031005, 3031009, 3031133, 3031137, 3031582, 3031815, 3032179, 3032213, 3032797, 3032824, 3032833, 3033002, 3033123, 3033391, 3033791, 3034006, 3034475, 3034640, 3035403, 3035409, 3035681, 3035843, 3036016, 3036145, 3036433, 3036460, 3036784, 3036903, 3036935, 3037044, 3037423, 3037456, 3037538, 3037543, 3037598, 3037612, 3037656, 3037854, 3038213, 3038224, 3038230, 3038261, 3038334, 3038350, 3038354, 3038634, 3038789];
                }
                if (country == "DE") {
                    var cityids = [2803560, 2805753, 2805761, 2806142, 2806654, 2806914, 2807363, 2807465, 2808559, 2808720, 2809346, 2809889, 2809985, 2810678, 2812174, 2812197, 2812482, 2813040, 2814127, 2815330, 2816630, 2817065, 2817220, 2817311, 2817724, 2820087, 2820256, 2821029, 2821164, 2824948, 2825297, 2826099, 2826287, 2826595, 2828045, 2829901, 2831580, 2831708, 2831924, 2831948, 2832495, 2832521, 2833079, 2833564, 2834265, 2834282, 2834498, 2835342, 2835482, 2835537, 2836319, 2841590, 2841648, 2842632, 2842647, 2842884, 2843729, 2844588, 2844988, 2847645, 2847690, 2847736, 2848273, 2849647, 2849802, 2850174, 2850257, 2851746, 2852458, 2853292, 2853572, 2853574, 2853658, 2853969, 2854653, 2855047, 2855328, 2855745, 2856883, 2857129, 2857458, 2857798, 2857807, 2858738, 2860410, 2861632, 2861650, 2861934, 2861982, 2862026, 2862620, 2863840, 2863941, 2864118, 2864425, 2864475, 2865637, 2866135, 2866333, 2866905, 2867542, 2867996, 2869791, 2869894, 2870221, 2871039, 2871535, 2871983, 2871992, 2872079, 2872504, 2872582, 2873263, 2873891, 2874225, 2874230, 2874545, 2875107, 2875115, 2875392, 2875457, 2875881, 2876185, 2876865, 2877088, 2878234, 2878695, 2878838, 2878943, 2879139, 2879367, 2881062, 2881085, 2881276, 2881485, 2881885, 2882087, 2884509, 2885679, 2885734, 2886946, 2890485, 2891122, 2891524, 2892080, 2892518, 2892794, 2893264, 2893438, 2894003, 2894375, 2895044, 2895669, 2895992, 2896817, 2897132, 2897216, 2898111, 2898304, 2899449, 2902768, 2904789, 2904795, 2905455, 2905560, 2905891, 2906121, 2906376, 2906530, 2906595, 2907201, 2907669, 2907852, 2907911, 2909230, 2911240, 2911271, 2911298, 2911395, 2911520, 2911665, 2912621, 2913366, 2913761, 2917138, 2917540, 2917788, 2918632, 2918752, 2918840, 2918987, 2919054, 2920236, 2920478, 2921232, 2921466, 2922586, 2923543, 2923822, 2924585, 2924802, 2924915, 2925017, 2925034, 2925177, 2925192, 2925259, 2925550, 2925629, 2925832, 2926271, 2927268, 2927930, 2928396, 2928615, 2928751, 2928809, 2928963, 2929567, 2929600, 2929622, 2929670, 2929671, 2929802, 2930596, 2930776, 2930821, 2931521, 2931574, 2933882, 2933965, 2934246, 2934486, 2934662, 2934691, 2935022, 2935220, 2935517, 2935530, 2935825, 2936871, 2936977, 2937936, 2937959, 2938323, 2938913, 2939623, 2939658, 2939811, 2939819, 2939951, 2940132, 2940213, 2940231, 2940451, 2941497, 2941693, 2942627, 2943320, 2943560, 2944368, 2944388, 2945756, 2946111, 2946228, 2946447, 2947421, 2947444, 2949012, 2949186, 2950159, 2950344, 2950349, 2950438, 2950622, 2950978, 2951654, 2951825, 2951881, 2952984, 2953358, 2953386, 2953416, 2953504, 2954006, 2954172, 2954602, 2955272, 2955471, 2955936, 2956656, 2957773, 2958141, 2958595, 2959223, 2959279, 2959927, 3247449, 3336891, 3336893];
                }
                if (country == "ALL") {
                    var cityids = [53654, 98182, 104515, 108410, 113646, 115019, 124665, 128747, 160263, 170063, 170654, 184745, 188714, 232422, 264371, 276781, 294615, 311046, 323786, 325363, 360630, 361058, 379252, 418863, 498817, 520555, 524901, 625144, 683506, 703448, 745044, 750269, 756135, 890299, 891099, 909137, 922704, 953781, 962330, 964137, 993800, 1007311, 1070940, 1166548, 1166993, 1168197, 1169825, 1172451, 1174872, 1176734, 1177662, 1179400, 1185236, 1185241, 1214520, 1253573, 1255364, 1255634, 1257629, 1259229, 1259652, 1260086, 1261481, 1262180, 1264728, 1266049, 1267995, 1268295, 1268865, 1269515, 1269743, 1270926, 1271308, 1271951, 1273294, 1275631, 1275841, 1277333, 1278148, 1279233, 1279259, 1279945, 1298824, 1311874, 1336135, 1486209, 1496747, 1512569, 1526384, 1581130, 1609350, 1625084, 1625822, 1627896, 1633070, 1642911, 1645518, 1649378, 1650357, 1668341, 1673820, 1680106, 1681602, 1683859, 1687409, 1687714, 1687801, 1687888, 1688217, 1688725, 1688949, 1689236, 1689413, 1689969, 1689994, 1690033, 1690158, 1690295, 1690684, 1691488, 1699896, 1701668, 1704129, 1705545, 1706843, 1707321, 1712637, 1715348, 1716994, 1720681, 1726701, 1729571, 1730499, 1735161, 1788534, 1790630, 1790923, 1791247, 1792947, 1793346, 1793511, 1796236, 1797929, 1798422, 1799962, 1800163, 1801792, 1804430, 1805298, 1805518, 1805753, 1808722, 1808926, 1808963, 1809077, 1809858, 1813451, 1814087, 1814906, 1815286, 1835848, 1850147, 1853192, 1859642, 1880252, 2034937, 2036502, 2037013, 2037345, 2037355, 2038180, 2038632, 2063523, 2066954, 2077963, 2147714, 2152667, 2154219, 2158177, 2164025, 2170852, 2171360, 2174003, 2188371, 2220957, 2232593, 2253354, 2267226, 2276600, 2293538, 2298890, 2306104, 2314302, 2335204, 2335727, 2339354, 2408770, 2422465, 2440485, 2460596, 2507480, 2518277, 2519240, 2538475, 2553604, 2633842, 2634715, 2639268, 2640194, 2643123, 2643741, 2644972, 2646507, 2654675, 2655603, 2661568, 2673730, 2761369, 2911298, 2950159, 2964574, 2988507, 2992119, 3054643, 3121070, 3369157, 3390760, 3399415, 3405863, 3435789, 3441575, 3448439, 3451190, 3452925, 3464975, 3467865, 3469058, 3470127, 3515431, 3529612, 3633009, 3646738, 3652462, 3657509, 3663517, 3687925, 3688689, 3689147, 3718426, 3936456, 3981609, 4003757, 4011469, 4046332, 4058198, 4061206, 4069458, 4069553, 4071267, 4074267, 4086224, 4099974, 4106074, 4110443, 4110486, 4123271, 4143637, 4143861, 4164047, 4166628, 4173892, 4180512, 4186213, 4188985, 4190598, 4206882, 4209884, 4211083, 4236206, 4242790, 4254679, 4268854, 4273837, 4276248, 4282757, 4289629, 4292193, 4346014, 4347778, 4434069, 4440906, 4463523, 4584524, 4603001, 4733891, 4887398, 4905873, 4920512, 5174095, 5814616];
                }
                if (country == "US") {
                    var cityids = [4046332, 4047198, 4048332, 4048850, 4049979, 4051774, 4053200, 4054566, 4055696, 4058198, 4058553, 4061206, 4062577, 4063926, 4065282, 4065302, 4065965, 4066437, 4068590, 4069458, 4069553, 4071267, 4072767, 4073383, 4074267, 4074673, 4076784, 4081914, 4086224, 4086285, 4093048, 4094163, 4099974, 4105377, 4105879, 4106074, 4106458, 4110443, 4110486, 4113143, 4113951, 4113956, 4119972, 4122986, 4123271, 4123830, 4125402, 4129965, 4132093, 4135349, 4142290, 4142643, 4143319, 4143637, 4143658, 4143698, 4143861, 4144764, 4145381, 4146039, 4146206, 4148207, 4148659, 4148757, 4149077, 4151316, 4151416, 4154216, 4154465, 4156404, 4158591, 4158928, 4159335, 4161228, 4161438, 4161461, 4164047, 4164138, 4166628, 4166787, 4167797, 4169510, 4171010, 4171563, 4172086, 4173838, 4173892, 4174757, 4175637, 4176217, 4177542, 4177703, 4178003, 4179320, 4180386, 4180439, 4180512, 4184845, 4186213, 4186416, 4187055, 4188985, 4189785, 4190598, 4192205, 4194202, 4196688, 4198972, 4202672, 4206882, 4207400, 4207625, 4207783, 4209884, 4211083, 4221552, 4223871, 4227777, 4229546, 4233813, 4235724, 4236206, 4240679, 4240782, 4242790, 4243951, 4248205, 4248284, 4252548, 4254282, 4254671, 4254679, 4255673, 4256384, 4257227, 4258285, 4259418, 4260210, 4260329, 4262406, 4263108, 4263681, 4263850, 4268854, 4273359, 4273837, 4274236, 4275144, 4275586, 4276248, 4276588, 4277241, 4281730, 4282342, 4282497, 4282757, 4283845, 4289629, 4292193, 4295954, 4297354, 4297983, 4297999, 4305294, 4308922, 4311646, 4313697, 4326868, 4332494, 4335045, 4335796, 4346014, 4346913, 4347778, 4349337, 4350175, 4353962, 4356050, 4364990, 4367734, 4369964, 4374798, 4376623, 4379025, 4382072, 4388036, 4391354, 4397042, 4400289, 4407010, 4407066, 4415076, 4417642, 4434069, 4434465, 4435764, 4440906, 4455335, 4459467, 4460243, 4463523, 4464368, 4473158, 4477228, 4479207, 4482693, 4485973, 4487042, 4503665, 4504915, 4508722, 4509986, 4521816, 4522228, 4528793, 4535806, 4544349, 4553433, 4559831, 4561873, 4584524, 4603001, 4608657, 4614136, 4634671, 4634946, 4650946, 4658802, 4672989, 4683416, 4691930, 4692355, 4692400, 4693003, 4697616, 4699533, 4710826, 4716805, 4719457, 4722241, 4726206, 4726311, 4726440, 4727076, 4733891, 4735013, 4773677, 4776222, 4791259, 4794457, 4839822, 4853828, 4878703, 4885983, 4887398, 4890813, 4905687, 4905873, 4907959, 4913605, 4915764, 4920512, 4925006, 4927042, 4928118, 4930956, 4936008, 4943629, 4990729, 4994358, 5007655, 5014130, 5045360, 5074472, 5098909, 5100604, 5106825, 5124276, 5129603, 5129887, 5190679, 5206379, 5255882, 5263045, 5304391, 5318313, 5323810, 5325738, 5368361, 5381002, 5389489, 5391959, 5392171, 5392900, 5399020, 5417598, 5454711, 5475433, 5809844, 5856195];
                }
                if (country == "AU") {
                    var cityids = [2058430, 2059470, 2062276, 2063030, 2063036, 2063042, 2063056, 2063523, 2064340, 2064510, 2064546, 2064550, 2064655, 2064735, 2064874, 2064915, 2065078, 2065176, 2065594, 2065602, 2065665, 2065710, 2065740, 2066041, 2066052, 2066358, 2066524, 2066608, 2066653, 2066679, 2066756, 2066954, 2066957, 2066981, 2067070, 2067074, 2067086, 2067119, 2067260, 2067565, 2067760, 2068079, 2068110, 2068655, 2070998, 2071059, 2071860, 2073124, 2074113, 2074865, 2075265, 2075432, 2075720, 2077454, 2077895, 2077963, 2078025, 2079691, 2079692, 2079696, 2142245, 2142316, 2143285, 2144168, 2144502, 2144528, 2144604, 2144764, 2145110, 2145214, 2145532, 2145554, 2145875, 2146108, 2146142, 2146219, 2146268, 2147381, 2147497, 2147714, 2147756, 2147914, 2148431, 2149128, 2149475, 2150163, 2150615, 2151187, 2151437, 2152286, 2152659, 2152667, 2153778, 2154219, 2154445, 2154447, 2154537, 2154544, 2154672, 2154787, 2154796, 2154826, 2154849, 2154913, 2155092, 2155135, 2155412, 2155415, 2155416, 2155472, 2155542, 2155562, 2155710, 2155731, 2155742, 2155745, 2155750, 2155772, 2155783, 2155796, 2155858, 2155859, 2155862, 2156034, 2156049, 2156069, 2156298, 2156340, 2156345, 2156404, 2156643, 2156671, 2156694, 2156777, 2156813, 2156825, 2156853, 2156878, 2156927, 2156933, 2156934, 2157060, 2157090, 2157109, 2157161, 2157272, 2157331, 2157343, 2157355, 2157373, 2157495, 2157652, 2157698, 2157995, 2158020, 2158130, 2158151, 2158177, 2158220, 2158504, 2158538, 2158561, 2158626, 2158651, 2158744, 2158767, 2158839, 2158867, 2158874, 2159018, 2159185, 2159194, 2159220, 2159654, 2159683, 2159851, 2160053, 2160063, 2160113, 2160114, 2160232, 2160258, 2160297, 2160299, 2160336, 2160386, 2160413, 2160477, 2160493, 2160517, 2160519, 2160523, 2160560, 2160625, 2160735, 2160744, 2160751, 2160774, 2160880, 2160910, 2160922, 2160937, 2161072, 2161251, 2161376, 2161515, 2161658, 2162662, 2162683, 2162737, 2163055, 2163355, 2163701, 2163837, 2164025, 2164129, 2164206, 2164422, 2164771, 2164837, 2165087, 2165478, 2165798, 2165828, 2166368, 2167426, 2168305, 2168943, 2169068, 2169220, 2169535, 2170078, 2170089, 2170139, 2170260, 2170430, 2170577, 2170581, 2171069, 2171085, 2171320, 2171507, 2171722, 2171845, 2172106, 2172153, 2172517, 2172710, 2172797, 2172832, 2173099, 2173125, 2173323, 2173605, 2173911, 2174003, 2174400, 2174444, 2174933, 2175403, 2175819, 2176187, 2176225, 2176639, 2177069, 2177091, 2177233, 2177413, 2177541, 2177671, 2177756, 2178174, 2205628, 2205631, 2205970, 2205971, 2205988, 2206000, 2206006, 2206066, 2206068, 2206082, 2206116, 2207598, 2207611, 2207753, 2207762, 2207817, 2207880, 6255012, 6301965, 6533368, 6620339, 6697141, 7280463, 7281804, 7302638, 7932638, 7932640, 7932641];
                }
                //parse lastRecordNumer as Integer as Tableau stores this as a string
                lastRecordToken = Number(lastRecordToken);
                // Return if lastRecordToken is greater than or equal to the size of cityids list
                if (lastRecordToken >= cityids.length) {
                    //if (lastRecordToken > 10) { //test with 10 cities
                    tableau.dataCallback([], lastRecordToken.toString(), false);
                    return;
                }
                var cityid = cityids[lastRecordToken];
				//build url to get data
                var connectionUrl = buildUrl(cityid);
                var xhr = $.ajax({
                    url: connectionUrl,
                    dataType: 'json',
                    success: function(data) {
                        var toRet = [];
                        //make sure we don't output anything for null values
                        if (data.list) {
                            var list = data.list;
                            var city = data.city;
                            //for each result write entry
                            for (x = 0; x < list.length; x++) {
                                //tableau.log("weatherwebconnect - getTableData city=" + city.name);
                                entry = {
                                    'COUNTRY': city.country,
                                    'CITY': city.name,
                                    'CITY ID': city.id,
                                    'DAYTEMP': list[x].temp.day,
                                    'MINTEMP': list[x].temp.min,
                                    'MAXTEMP': list[x].temp.max,
                                    'NIGHTTEMP': list[x].temp.night,
                                    'EVETEMP': list[x].temp.eve,
                                    'MORNTEMP': list[x].temp.morn,
                                    'PRESSURE': list[x].pressure,
                                    'HUMIDITY': list[x].humidity,
                                    'DATE': new Date(list[x].dt * 1000),
                                    'MAIN': list[x].weather[0].main,
                                    'DESCRIPTION': list[x].weather[0].description,
                                    'ICON': list[x].weather[0].icon,
                                    'SPEED': list[x].speed,
                                    'DEGREES': list[x].deg,
                                    'CLOUD': list[x].clouds,
                                    'LAT': city.coord.lat,
                                    'LON': city.coord.lon
                                };
                                toRet.push(entry);
                            }
                            // Call back to tableau with the table data and the new record number (this is stored as a string)
                            lastRecordToken = lastRecordToken + 1;
                            tableau.dataCallback(toRet, lastRecordToken.toString(), true);
                        } else {
                            tableau.abortWithError("No results found for city id: " + cityid);
                        }
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        // add something to the log and return an empty set if there was problem with the connection
                        tableau.log("connection error: " + xhr.responseText + "\n" + thrownError);
                        tableau.abortWithError("error connecting to the openweathermaps API data source");
                    }
                });
            };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Weather Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
