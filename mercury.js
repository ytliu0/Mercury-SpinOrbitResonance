"use strict";

var t1, t2; // global timestep for animations 1 and 2
var frame_rate = 25; // time between two frames in ms
var step1, step2; // control the speed of animations 1 and 2
var animate1_id, animate2_id; // id's for animations 1 and 2
var e = 0.20563069; // Mercury's orbital eccentricity
var f1_e2 = 1-e*e; // 1-e^2

// true anomaly array (calculated from the C++ code)
var theta_arr = [-3.14159, -3.13807, -3.13454, -3.13102, -3.12749, -3.12397, -3.12044, -3.11691, -3.11339, -3.10986, -3.10634, -3.10281, -3.09928, -3.09576, -3.09223, -3.0887, -3.08517, -3.08165, -3.07812, -3.07459, -3.07106, -3.06753, -3.064, -3.06047, -3.05693, -3.0534, -3.04987, -3.04634, -3.0428, -3.03927, -3.03573, -3.0322, -3.02866, -3.02512, -3.02159, -3.01805, -3.01451, -3.01097, -3.00743, -3.00388, -3.00034, -2.9968, -2.99325, -2.98971, -2.98616, -2.98261, -2.97906, -2.97551, -2.97196, -2.96841, -2.96486, -2.9613, -2.95775, -2.95419, -2.95063, -2.94707, -2.94351, -2.93995, -2.93639, -2.93282, -2.92926, -2.92569, -2.92212, -2.91855, -2.91498, -2.91141, -2.90783, -2.90426, -2.90068, -2.8971, -2.89352, -2.88994, -2.88636, -2.88277, -2.87918, -2.87559, -2.872, -2.86841, -2.86482, -2.86122, -2.85762, -2.85402, -2.85042, -2.84682, -2.84321, -2.83961, -2.836, -2.83239, -2.82877, -2.82516, -2.82154, -2.81792, -2.8143, -2.81067, -2.80705, -2.80342, -2.79979, -2.79616, -2.79252, -2.78888, -2.78525, -2.7816, -2.77796, -2.77431, -2.77066, -2.76701, -2.76336, -2.7597, -2.75604, -2.75238, -2.74871, -2.74505, -2.74138, -2.73771, -2.73403, -2.73035, -2.72667, -2.72299, -2.7193, -2.71561, -2.71192, -2.70823, -2.70453, -2.70083, -2.69713, -2.69342, -2.68971, -2.686, -2.68228, -2.67857, -2.67484, -2.67112, -2.66739, -2.66366, -2.65993, -2.65619, -2.65245, -2.6487, -2.64496, -2.64121, -2.63745, -2.63369, -2.62993, -2.62617, -2.6224, -2.61863, -2.61485, -2.61107, -2.60729, -2.60351, -2.59972, -2.59592, -2.59213, -2.58832, -2.58452, -2.58071, -2.5769, -2.57308, -2.56926, -2.56544, -2.56161, -2.55778, -2.55394, -2.5501, -2.54626, -2.54241, -2.53856, -2.5347, -2.53084, -2.52698, -2.52311, -2.51923, -2.51535, -2.51147, -2.50759, -2.50369, -2.4998, -2.4959, -2.49199, -2.48809, -2.48417, -2.48025, -2.47633, -2.4724, -2.46847, -2.46453, -2.46059, -2.45665, -2.45269, -2.44874, -2.44478, -2.44081, -2.43684, -2.43286, -2.42888, -2.4249, -2.42091, -2.41691, -2.41291, -2.4089, -2.40489, -2.40087, -2.39685, -2.39282, -2.38879, -2.38475, -2.38071, -2.37666, -2.3726, -2.36854, -2.36448, -2.36041, -2.35633, -2.35225, -2.34816, -2.34406, -2.33996, -2.33586, -2.33175, -2.32763, -2.32351, -2.31938, -2.31524, -2.3111, -2.30695, -2.3028, -2.29864, -2.29447, -2.2903, -2.28612, -2.28194, -2.27775, -2.27355, -2.26935, -2.26514, -2.26092, -2.2567, -2.25247, -2.24823, -2.24399, -2.23974, -2.23549, -2.23122, -2.22695, -2.22268, -2.2184, -2.21411, -2.20981, -2.20551, -2.20119, -2.19688, -2.19255, -2.18822, -2.18388, -2.17953, -2.17518, -2.17082, -2.16645, -2.16208, -2.15769, -2.1533, -2.1489, -2.1445, -2.14009, -2.13567, -2.13124, -2.1268, -2.12236, -2.11791, -2.11345, -2.10898, -2.10451, -2.10002, -2.09553, -2.09103, -2.08653, -2.08201, -2.07749, -2.07296, -2.06842, -2.06387, -2.05931, -2.05475, -2.05018, -2.04559, -2.041, -2.03641, -2.0318, -2.02718, -2.02256, -2.01793, -2.01328, -2.00863, -2.00398, -1.99931, -1.99463, -1.98994, -1.98525, -1.98054, -1.97583, -1.97111, -1.96638, -1.96164, -1.95689, -1.95213, -1.94736, -1.94258, -1.93779, -1.93299, -1.92819, -1.92337, -1.91854, -1.91371, -1.90886, -1.90401, -1.89914, -1.89427, -1.88938, -1.88449, -1.87958, -1.87467, -1.86974, -1.86481, -1.85986, -1.8549, -1.84994, -1.84496, -1.83997, -1.83498, -1.82997, -1.82495, -1.81992, -1.81488, -1.80983, -1.80477, -1.7997, -1.79461, -1.78952, -1.78442, -1.7793, -1.77417, -1.76904, -1.76389, -1.75873, -1.75356, -1.74837, -1.74318, -1.73798, -1.73276, -1.72753, -1.72229, -1.71704, -1.71178, -1.7065, -1.70122, -1.69592, -1.69061, -1.68529, -1.67996, -1.67461, -1.66925, -1.66389, -1.6585, -1.65311, -1.64771, -1.64229, -1.63686, -1.63142, -1.62596, -1.6205, -1.61502, -1.60952, -1.60402, -1.5985, -1.59297, -1.58743, -1.58188, -1.57631, -1.57073, -1.56514, -1.55953, -1.55391, -1.54828, -1.54263, -1.53698, -1.53131, -1.52562, -1.51992, -1.51421, -1.50849, -1.50275, -1.497, -1.49124, -1.48546, -1.47967, -1.47387, -1.46805, -1.46222, -1.45637, -1.45051, -1.44464, -1.43875, -1.43285, -1.42694, -1.42101, -1.41507, -1.40911, -1.40315, -1.39716, -1.39116, -1.38515, -1.37913, -1.37309, -1.36703, -1.36096, -1.35488, -1.34879, -1.34267, -1.33655, -1.33041, -1.32425, -1.31809, -1.3119, -1.30571, -1.29949, -1.29327, -1.28703, -1.28077, -1.2745, -1.26822, -1.26192, -1.2556, -1.24927, -1.24293, -1.23657, -1.2302, -1.22381, -1.21741, -1.21099, -1.20456, -1.19811, -1.19165, -1.18517, -1.17868, -1.17217, -1.16565, -1.15912, -1.15257, -1.146, -1.13942, -1.13282, -1.12621, -1.11959, -1.11295, -1.10629, -1.09962, -1.09293, -1.08623, -1.07952, -1.07279, -1.06604, -1.05928, -1.05251, -1.04572, -1.03891, -1.03209, -1.02526, -1.01841, -1.01154, -1.00466, -0.997768, -0.990859, -0.983935, -0.976996, -0.970043, -0.963075, -0.956092, -0.949095, -0.942082, -0.935056, -0.928014, -0.920959, -0.913888, -0.906803, -0.899704, -0.89259, -0.885462, -0.878319, -0.871162, -0.863991, -0.856806, -0.849607, -0.842393, -0.835165, -0.827924, -0.820668, -0.813398, -0.806115, -0.798818, -0.791507, -0.784182, -0.776844, -0.769492, -0.762126, -0.754748, -0.747355, -0.73995, -0.732531, -0.725099, -0.717654, -0.710196, -0.702726, -0.695242, -0.687745, -0.680236, -0.672714, -0.66518, -0.657633, -0.650074, -0.642503, -0.63492, -0.627324, -0.619717, -0.612098, -0.604467, -0.596824, -0.58917, -0.581504, -0.573827, -0.566139, -0.558439, -0.550729, -0.543007, -0.535275, -0.527532, -0.519779, -0.512015, -0.504241, -0.496457, -0.488663, -0.480858, -0.473044, -0.46522, -0.457387, -0.449544, -0.441692, -0.433831, -0.425961, -0.418082, -0.410194, -0.402298, -0.394393, -0.386479, -0.378558, -0.370629, -0.362692, -0.354747, -0.346794, -0.338834, -0.330867, -0.322893, -0.314912, -0.306924, -0.298929, -0.290928, -0.28292, -0.274907, -0.266887, -0.258862, -0.250831, -0.242794, -0.234752, -0.226705, -0.218653, -0.210596, -0.202535, -0.194469, -0.186398, -0.178324, -0.170246, -0.162163, -0.154078, -0.145988, -0.137896, -0.1298, -0.121702, -0.113601, -0.105497, -0.0973911, -0.0892828, -0.0811726, -0.0730605, -0.0649468, -0.0568317, -0.0487152, -0.0405977, -0.0324793, -0.0243601, -0.0162404, -0.00812027, 0, 0.00812027, 0.0162404, 0.0243601, 0.0324793, 0.0405977, 0.0487152, 0.0568317, 0.0649468, 0.0730605, 0.0811726, 0.0892828, 0.0973911, 0.105497, 0.113601, 0.121702, 0.1298, 0.137896, 0.145988, 0.154078, 0.162163, 0.170246, 0.178324, 0.186398, 0.194469, 0.202535, 0.210596, 0.218653, 0.226705, 0.234752, 0.242794, 0.250831, 0.258862, 0.266887, 0.274907, 0.28292, 0.290928, 0.298929, 0.306924, 0.314912, 0.322893, 0.330867, 0.338834, 0.346794, 0.354747, 0.362692, 0.370629, 0.378558, 0.386479, 0.394393, 0.402298, 0.410194, 0.418082, 0.425961, 0.433831, 0.441692, 0.449544, 0.457387, 0.46522, 0.473044, 0.480858, 0.488663, 0.496457, 0.504241, 0.512015, 0.519779, 0.527532, 0.535275, 0.543007, 0.550729, 0.558439, 0.566139, 0.573827, 0.581504, 0.58917, 0.596824, 0.604467, 0.612098, 0.619717, 0.627324, 0.63492, 0.642503, 0.650074, 0.657633, 0.66518, 0.672714, 0.680236, 0.687745, 0.695242, 0.702726, 0.710196, 0.717654, 0.725099, 0.732531, 0.73995, 0.747355, 0.754748, 0.762126, 0.769492, 0.776844, 0.784182, 0.791507, 0.798818, 0.806115, 0.813398, 0.820668, 0.827924, 0.835165, 0.842393, 0.849607, 0.856806, 0.863991, 0.871162, 0.878319, 0.885462, 0.89259, 0.899704, 0.906803, 0.913888, 0.920959, 0.928014, 0.935056, 0.942082, 0.949095, 0.956092, 0.963075, 0.970043, 0.976996, 0.983935, 0.990859, 0.997768, 1.00466, 1.01154, 1.01841, 1.02526, 1.03209, 1.03891, 1.04572, 1.05251, 1.05928, 1.06604, 1.07279, 1.07952, 1.08623, 1.09293, 1.09962, 1.10629, 1.11295, 1.11959, 1.12621, 1.13282, 1.13942, 1.146, 1.15257, 1.15912, 1.16565, 1.17217, 1.17868, 1.18517, 1.19165, 1.19811, 1.20456, 1.21099, 1.21741, 1.22381, 1.2302, 1.23657, 1.24293, 1.24927, 1.2556, 1.26192, 1.26822, 1.2745, 1.28077, 1.28703, 1.29327, 1.29949, 1.30571, 1.3119, 1.31809, 1.32425, 1.33041, 1.33655, 1.34267, 1.34879, 1.35488, 1.36096, 1.36703, 1.37309, 1.37913, 1.38515, 1.39116, 1.39716, 1.40315, 1.40911, 1.41507, 1.42101, 1.42694, 1.43285, 1.43875, 1.44464, 1.45051, 1.45637, 1.46222, 1.46805, 1.47387, 1.47967, 1.48546, 1.49124, 1.497, 1.50275, 1.50849, 1.51421, 1.51992, 1.52562, 1.53131, 1.53698, 1.54263, 1.54828, 1.55391, 1.55953, 1.56514, 1.57073, 1.57631, 1.58188, 1.58743, 1.59297, 1.5985, 1.60402, 1.60952, 1.61502, 1.6205, 1.62596, 1.63142, 1.63686, 1.64229, 1.64771, 1.65311, 1.6585, 1.66389, 1.66925, 1.67461, 1.67996, 1.68529, 1.69061, 1.69592, 1.70122, 1.7065, 1.71178, 1.71704, 1.72229, 1.72753, 1.73276, 1.73798, 1.74318, 1.74837, 1.75356, 1.75873, 1.76389, 1.76904, 1.77417, 1.7793, 1.78442, 1.78952, 1.79461, 1.7997, 1.80477, 1.80983, 1.81488, 1.81992, 1.82495, 1.82997, 1.83498, 1.83997, 1.84496, 1.84994, 1.8549, 1.85986, 1.86481, 1.86974, 1.87467, 1.87958, 1.88449, 1.88938, 1.89427, 1.89914, 1.90401, 1.90886, 1.91371, 1.91854, 1.92337, 1.92819, 1.93299, 1.93779, 1.94258, 1.94736, 1.95213, 1.95689, 1.96164, 1.96638, 1.97111, 1.97583, 1.98054, 1.98525, 1.98994, 1.99463, 1.99931, 2.00398, 2.00863, 2.01328, 2.01793, 2.02256, 2.02718, 2.0318, 2.03641, 2.041, 2.04559, 2.05018, 2.05475, 2.05931, 2.06387, 2.06842, 2.07296, 2.07749, 2.08201, 2.08653, 2.09103, 2.09553, 2.10002, 2.10451, 2.10898, 2.11345, 2.11791, 2.12236, 2.1268, 2.13124, 2.13567, 2.14009, 2.1445, 2.1489, 2.1533, 2.15769, 2.16208, 2.16645, 2.17082, 2.17518, 2.17953, 2.18388, 2.18822, 2.19255, 2.19688, 2.20119, 2.20551, 2.20981, 2.21411, 2.2184, 2.22268, 2.22695, 2.23122, 2.23549, 2.23974, 2.24399, 2.24823, 2.25247, 2.2567, 2.26092, 2.26514, 2.26935, 2.27355, 2.27775, 2.28194, 2.28612, 2.2903, 2.29447, 2.29864, 2.3028, 2.30695, 2.3111, 2.31524, 2.31938, 2.32351, 2.32763, 2.33175, 2.33586, 2.33996, 2.34406, 2.34816, 2.35225, 2.35633, 2.36041, 2.36448, 2.36854, 2.3726, 2.37666, 2.38071, 2.38475, 2.38879, 2.39282, 2.39685, 2.40087, 2.40489, 2.4089, 2.41291, 2.41691, 2.42091, 2.4249, 2.42888, 2.43286, 2.43684, 2.44081, 2.44478, 2.44874, 2.45269, 2.45665, 2.46059, 2.46453, 2.46847, 2.4724, 2.47633, 2.48025, 2.48417, 2.48809, 2.49199, 2.4959, 2.4998, 2.50369, 2.50759, 2.51147, 2.51535, 2.51923, 2.52311, 2.52698, 2.53084, 2.5347, 2.53856, 2.54241, 2.54626, 2.5501, 2.55394, 2.55778, 2.56161, 2.56544, 2.56926, 2.57308, 2.5769, 2.58071, 2.58452, 2.58832, 2.59213, 2.59592, 2.59972, 2.60351, 2.60729, 2.61107, 2.61485, 2.61863, 2.6224, 2.62617, 2.62993, 2.63369, 2.63745, 2.64121, 2.64496, 2.6487, 2.65245, 2.65619, 2.65993, 2.66366, 2.66739, 2.67112, 2.67484, 2.67857, 2.68228, 2.686, 2.68971, 2.69342, 2.69713, 2.70083, 2.70453, 2.70823, 2.71192, 2.71561, 2.7193, 2.72299, 2.72667, 2.73035, 2.73403, 2.73771, 2.74138, 2.74505, 2.74871, 2.75238, 2.75604, 2.7597, 2.76336, 2.76701, 2.77066, 2.77431, 2.77796, 2.7816, 2.78525, 2.78888, 2.79252, 2.79616, 2.79979, 2.80342, 2.80705, 2.81067, 2.8143, 2.81792, 2.82154, 2.82516, 2.82877, 2.83239, 2.836, 2.83961, 2.84321, 2.84682, 2.85042, 2.85402, 2.85762, 2.86122, 2.86482, 2.86841, 2.872, 2.87559, 2.87918, 2.88277, 2.88636, 2.88994, 2.89352, 2.8971, 2.90068, 2.90426, 2.90783, 2.91141, 2.91498, 2.91855, 2.92212, 2.92569, 2.92926, 2.93282, 2.93639, 2.93995, 2.94351, 2.94707, 2.95063, 2.95419, 2.95775, 2.9613, 2.96486, 2.96841, 2.97196, 2.97551, 2.97906, 2.98261, 2.98616, 2.98971, 2.99325, 2.9968, 3.00034, 3.00388, 3.00743, 3.01097, 3.01451, 3.01805, 3.02159, 3.02512, 3.02866, 3.0322, 3.03573, 3.03927, 3.0428, 3.04634, 3.04987, 3.0534, 3.05693, 3.06047, 3.064, 3.06753, 3.07106, 3.07459, 3.07812, 3.08165, 3.08517, 3.0887, 3.09223, 3.09576, 3.09928, 3.10281, 3.10634, 3.10986, 3.11339, 3.11691, 3.12044, 3.12397, 3.12749, 3.13102, 3.13454, 3.13807, 3.14159, 3.14512, 3.14864, 3.15217, 3.15569, 3.15922, 3.16274, 3.16627, 3.1698, 3.17332, 3.17685, 3.18038, 3.1839, 3.18743, 3.19096, 3.19448, 3.19801, 3.20154, 3.20507, 3.2086, 3.21213, 3.21566, 3.21919, 3.22272, 3.22625, 3.22978, 3.23332, 3.23685, 3.24038, 3.24392, 3.24745, 3.25099, 3.25452, 3.25806, 3.2616, 3.26514, 3.26868, 3.27222, 3.27576, 3.2793, 3.28284, 3.28639, 3.28993, 3.29348, 3.29703, 3.30057, 3.30412, 3.30767, 3.31122, 3.31478, 3.31833, 3.32188, 3.32544, 3.32899, 3.33255, 3.33611, 3.33967, 3.34323, 3.3468, 3.35036, 3.35393, 3.35749, 3.36106, 3.36463, 3.3682, 3.37178, 3.37535, 3.37893, 3.3825, 3.38608, 3.38966, 3.39325, 3.39683, 3.40041, 3.404, 3.40759, 3.41118, 3.41477, 3.41837, 3.42196, 3.42556, 3.42916, 3.43276, 3.43637, 3.43997, 3.44358, 3.44719, 3.4508, 3.45441, 3.45803, 3.46165, 3.46527, 3.46889, 3.47251, 3.47614, 3.47976, 3.4834, 3.48703, 3.49066, 3.4943, 3.49794, 3.50158, 3.50523, 3.50887, 3.51252, 3.51617, 3.51983, 3.52349, 3.52714, 3.53081, 3.53447, 3.53814, 3.54181, 3.54548, 3.54915, 3.55283, 3.55651, 3.5602, 3.56388, 3.56757, 3.57126, 3.57496, 3.57865, 3.58235, 3.58606, 3.58976, 3.59347, 3.59719, 3.6009, 3.60462, 3.60834, 3.61207, 3.61579, 3.61952, 3.62326, 3.627, 3.63074, 3.63448, 3.63823, 3.64198, 3.64573, 3.64949, 3.65325, 3.65702, 3.66079, 3.66456, 3.66833, 3.67211, 3.67589, 3.67968, 3.68347, 3.68726, 3.69106, 3.69486, 3.69867, 3.70247, 3.70629, 3.7101, 3.71392, 3.71775, 3.72157, 3.72541, 3.72924, 3.73308, 3.73693, 3.74078, 3.74463, 3.74848, 3.75235, 3.75621, 3.76008, 3.76395, 3.76783, 3.77171, 3.7756, 3.77949, 3.78339, 3.78729, 3.79119, 3.7951, 3.79901, 3.80293, 3.80685, 3.81078, 3.81471, 3.81865, 3.82259, 3.82654, 3.83049, 3.83445, 3.83841, 3.84237, 3.84634, 3.85032, 3.8543, 3.85829, 3.86228, 3.86628, 3.87028, 3.87428, 3.87829, 3.88231, 3.88633, 3.89036, 3.89439, 3.89843, 3.90248, 3.90653, 3.91058, 3.91464, 3.91871, 3.92278, 3.92686, 3.93094, 3.93503, 3.93912, 3.94322, 3.94733, 3.95144, 3.95556, 3.95968, 3.96381, 3.96794, 3.97208, 3.97623, 3.98039, 3.98454, 3.98871, 3.99288, 3.99706, 4.00124, 4.00544, 4.00963, 4.01384, 4.01805, 4.02226, 4.02649, 4.03071, 4.03495, 4.03919, 4.04344, 4.0477, 4.05196, 4.05623, 4.06051, 4.06479, 4.06908, 4.07338, 4.07768, 4.08199, 4.08631, 4.09063, 4.09497, 4.09931, 4.10365, 4.10801, 4.11237, 4.11673, 4.12111, 4.12549, 4.12988, 4.13428, 4.13869, 4.1431, 4.14752, 4.15195, 4.15638, 4.16083, 4.16528, 4.16974, 4.1742, 4.17868, 4.18316, 4.18765, 4.19215, 4.19666, 4.20117, 4.2057, 4.21023, 4.21477, 4.21932, 4.22387, 4.22844, 4.23301, 4.23759, 4.24218, 4.24678, 4.25139, 4.256, 4.26063, 4.26526, 4.2699, 4.27455, 4.27921, 4.28388, 4.28856, 4.29324, 4.29794, 4.30264, 4.30735, 4.31208, 4.31681, 4.32155, 4.3263, 4.33106, 4.33583, 4.34061, 4.34539, 4.35019, 4.355, 4.35981, 4.36464, 4.36948, 4.37432, 4.37918, 4.38404, 4.38892, 4.3938, 4.3987, 4.4036, 4.40852, 4.41344, 4.41838, 4.42333, 4.42828, 4.43325, 4.43822, 4.44321, 4.44821, 4.45322, 4.45824, 4.46326, 4.4683, 4.47335, 4.47842, 4.48349, 4.48857, 4.49366, 4.49877, 4.50388, 4.50901, 4.51415, 4.5193, 4.52446, 4.52963, 4.53481, 4.54, 4.54521, 4.55043, 4.55565, 4.56089, 4.56614, 4.57141, 4.57668, 4.58197, 4.58727, 4.59257, 4.5979, 4.60323, 4.60857, 4.61393, 4.6193, 4.62468, 4.63007, 4.63548, 4.6409, 4.64633, 4.65177, 4.65722, 4.66269, 4.66817, 4.67366, 4.67917, 4.68468, 4.69021, 4.69575, 4.70131, 4.70688, 4.71246, 4.71805, 4.72365, 4.72927, 4.73491, 4.74055, 4.74621, 4.75188, 4.75756, 4.76326, 4.76897, 4.7747, 4.78043, 4.78618, 4.79195, 4.79772, 4.80352, 4.80932, 4.81514, 4.82097, 4.82681, 4.83267, 4.83855, 4.84443, 4.85033, 4.85625, 4.86217, 4.86812, 4.87407, 4.88004, 4.88602, 4.89202, 4.89803, 4.90406, 4.9101, 4.91615, 4.92222, 4.9283, 4.9344, 4.94051, 4.94664, 4.95278, 4.95893, 4.9651, 4.97128, 4.97748, 4.98369, 4.98992, 4.99616, 5.00241, 5.00868, 5.01497, 5.02127, 5.02758, 5.03391, 5.04026, 5.04661, 5.05299, 5.05937, 5.06578, 5.07219, 5.07863, 5.08507, 5.09154, 5.09801, 5.1045, 5.11101, 5.11753, 5.12407, 5.13062, 5.13719, 5.14377, 5.15036, 5.15697, 5.1636, 5.17024, 5.1769, 5.18357, 5.19025, 5.19695, 5.20367, 5.2104, 5.21714, 5.2239, 5.23068, 5.23747, 5.24427, 5.25109, 5.25793, 5.26478, 5.27164, 5.27852, 5.28542, 5.29233, 5.29925, 5.30619, 5.31314, 5.32011, 5.32709, 5.33409, 5.3411, 5.34813, 5.35517, 5.36223, 5.3693, 5.37638, 5.38348, 5.3906, 5.39772, 5.40487, 5.41202, 5.41919, 5.42638, 5.43358, 5.44079, 5.44802, 5.45526, 5.46252, 5.46979, 5.47707, 5.48437, 5.49168, 5.499, 5.50634, 5.51369, 5.52106, 5.52844, 5.53583, 5.54324, 5.55065, 5.55809, 5.56553, 5.57299, 5.58046, 5.58794, 5.59544, 5.60295, 5.61047, 5.61801, 5.62555, 5.63311, 5.64068, 5.64827, 5.65586, 5.66347, 5.67109, 5.67872, 5.68636, 5.69402, 5.70168, 5.70936, 5.71705, 5.72475, 5.73246, 5.74018, 5.74791, 5.75565, 5.76341, 5.77117, 5.77894, 5.78673, 5.79452, 5.80233, 5.81014, 5.81796, 5.8258, 5.83364, 5.84149, 5.84935, 5.85722, 5.8651, 5.87299, 5.88089, 5.88879, 5.89671, 5.90463, 5.91256, 5.92049, 5.92844, 5.93639, 5.94435, 5.95232, 5.96029, 5.96827, 5.97626, 5.98426, 5.99226, 6.00027, 6.00828, 6.0163, 6.02432, 6.03235, 6.04039, 6.04843, 6.05648, 6.06453, 6.07259, 6.08065, 6.08872, 6.09679, 6.10486, 6.11294, 6.12102, 6.12911, 6.1372, 6.14529, 6.15338, 6.16148, 6.16958, 6.17769, 6.18579, 6.1939, 6.20201, 6.21012, 6.21824, 6.22635, 6.23447, 6.24259, 6.25071, 6.25883, 6.26694, 6.27507, 6.28319, 6.29131, 6.29943, 6.30755, 6.31566, 6.32378, 6.3319, 6.34002, 6.34813, 6.35625, 6.36436, 6.37247, 6.38058, 6.38868, 6.39679, 6.40489, 6.41299, 6.42108, 6.42917, 6.43726, 6.44535, 6.45343, 6.46151, 6.46958, 6.47765, 6.48572, 6.49378, 6.50184, 6.50989, 6.51794, 6.52598, 6.53402, 6.54205, 6.55007, 6.55809, 6.56611, 6.57411, 6.58211, 6.59011, 6.5981, 6.60608, 6.61405, 6.62202, 6.62998, 6.63793, 6.64588, 6.65381, 6.66174, 6.66966, 6.67758, 6.68548, 6.69338, 6.70127, 6.70915, 6.71702, 6.72488, 6.73273, 6.74057, 6.74841, 6.75623, 6.76404, 6.77185, 6.77964, 6.78743, 6.7952, 6.80296, 6.81072, 6.81846, 6.82619, 6.83391, 6.84162, 6.84932, 6.85701, 6.86469, 6.87235, 6.88001, 6.88765, 6.89528, 6.9029, 6.91051, 6.91811, 6.92569, 6.93326, 6.94082, 6.94837, 6.9559, 6.96342, 6.97093, 6.97843, 6.98591, 6.99338, 7.00084, 7.00828, 7.01572, 7.02314, 7.03054, 7.03793, 7.04531, 7.05268, 7.06003, 7.06737, 7.07469, 7.082, 7.0893, 7.09658, 7.10385, 7.11111, 7.11835, 7.12558, 7.13279, 7.13999, 7.14718, 7.15435, 7.1615, 7.16865, 7.17578, 7.18289, 7.18999, 7.19707, 7.20414, 7.2112, 7.21824, 7.22527, 7.23228, 7.23928, 7.24626, 7.25323, 7.26018, 7.26712, 7.27404, 7.28095, 7.28785, 7.29473, 7.30159, 7.30844, 7.31528, 7.3221, 7.3289, 7.33569, 7.34247, 7.34923, 7.35597, 7.3627, 7.36942, 7.37612, 7.3828, 7.38948, 7.39613, 7.40277, 7.4094, 7.41601, 7.4226, 7.42919, 7.43575, 7.4423, 7.44884, 7.45536, 7.46187, 7.46836, 7.47484, 7.4813, 7.48774, 7.49418, 7.50059, 7.507, 7.51338, 7.51976, 7.52612, 7.53246, 7.53879, 7.5451, 7.5514, 7.55769, 7.56396, 7.57021, 7.57645, 7.58268, 7.58889, 7.59509, 7.60127, 7.60744, 7.61359, 7.61973, 7.62586, 7.63197, 7.63807, 7.64415, 7.65022, 7.65627, 7.66231, 7.66834, 7.67435, 7.68035, 7.68633, 7.6923, 7.69826, 7.7042, 7.71012, 7.71604, 7.72194, 7.72782, 7.7337, 7.73956, 7.7454, 7.75123, 7.75705, 7.76286, 7.76865, 7.77442, 7.78019, 7.78594, 7.79167, 7.7974, 7.80311, 7.80881, 7.81449, 7.82016, 7.82582, 7.83146, 7.8371, 7.84272, 7.84832, 7.85391, 7.8595, 7.86506, 7.87062, 7.87616, 7.88169, 7.88721, 7.89271, 7.8982, 7.90368, 7.90915, 7.9146, 7.92004, 7.92547, 7.93089, 7.9363, 7.94169, 7.94707, 7.95244, 7.9578, 7.96314, 7.96847, 7.9738, 7.97911, 7.9844, 7.98969, 7.99496, 8.00023, 8.00548, 8.01072, 8.01594, 8.02116, 8.02637, 8.03156, 8.03674, 8.04191, 8.04707, 8.05222, 8.05736, 8.06249, 8.0676, 8.07271, 8.0778, 8.08288, 8.08795, 8.09302, 8.09807, 8.10311, 8.10814, 8.11315, 8.11816, 8.12316, 8.12815, 8.13312, 8.13809, 8.14305, 8.14799, 8.15293, 8.15785, 8.16277, 8.16767, 8.17257, 8.17745, 8.18233, 8.18719, 8.19205, 8.19689, 8.20173, 8.20656, 8.21137, 8.21618, 8.22098, 8.22576, 8.23054, 8.23531, 8.24007, 8.24482, 8.24956, 8.25429, 8.25902, 8.26373, 8.26843, 8.27313, 8.27782, 8.28249, 8.28716, 8.29182, 8.29647, 8.30111, 8.30574, 8.31037, 8.31498, 8.31959, 8.32419, 8.32878, 8.33336, 8.33793, 8.3425, 8.34705, 8.3516, 8.35614, 8.36067, 8.3652, 8.36971, 8.37422, 8.37872, 8.38321, 8.38769, 8.39217, 8.39663, 8.40109, 8.40554, 8.40999, 8.41442, 8.41885, 8.42327, 8.42768, 8.43209, 8.43649, 8.44088, 8.44526, 8.44964, 8.454, 8.45837, 8.46272, 8.46707, 8.4714, 8.47574, 8.48006, 8.48438, 8.48869, 8.49299, 8.49729, 8.50158, 8.50586, 8.51014, 8.51441, 8.51867, 8.52293, 8.52718, 8.53142, 8.53566, 8.53989, 8.54411, 8.54832, 8.55253, 8.55674, 8.56093, 8.56513, 8.56931, 8.57349, 8.57766, 8.58183, 8.58599, 8.59014, 8.59429, 8.59843, 8.60256, 8.60669, 8.61082, 8.61493, 8.61904, 8.62315, 8.62725, 8.63134, 8.63543, 8.63952, 8.64359, 8.64766, 8.65173, 8.65579, 8.65984, 8.66389, 8.66794, 8.67198, 8.67601, 8.68004, 8.68406, 8.68808, 8.69209, 8.69609, 8.7001, 8.70409, 8.70808, 8.71207, 8.71605, 8.72003, 8.724, 8.72796, 8.73192, 8.73588, 8.73983, 8.74378, 8.74772, 8.75166, 8.75559, 8.75952, 8.76344, 8.76736, 8.77127, 8.77518, 8.77908, 8.78298, 8.78688, 8.79077, 8.79466, 8.79854, 8.80242, 8.80629, 8.81016, 8.81403, 8.81789, 8.82174, 8.8256, 8.82944, 8.83329, 8.83713, 8.84096, 8.8448, 8.84862, 8.85245, 8.85627, 8.86008, 8.8639, 8.86771, 8.87151, 8.87531, 8.87911, 8.8829, 8.88669, 8.89048, 8.89426, 8.89804, 8.90181, 8.90558, 8.90935, 8.91312, 8.91688, 8.92064, 8.92439, 8.92814, 8.93189, 8.93563, 8.93937, 8.94311, 8.94685, 8.95058, 8.9543, 8.95803, 8.96175, 8.96547, 8.96919, 8.9729, 8.97661, 8.98031, 8.98402, 8.98772, 8.99141, 8.99511, 8.9988, 9.00249, 9.00618, 9.00986, 9.01354, 9.01722, 9.02089, 9.02456, 9.02823, 9.0319, 9.03556, 9.03923, 9.04289, 9.04654, 9.0502, 9.05385, 9.0575, 9.06114, 9.06479, 9.06843, 9.07207, 9.07571, 9.07934, 9.08298, 9.08661, 9.09023, 9.09386, 9.09748, 9.10111, 9.10473, 9.10834, 9.11196, 9.11557, 9.11918, 9.12279, 9.1264, 9.13, 9.13361, 9.13721, 9.14081, 9.14441, 9.148, 9.1516, 9.15519, 9.15878, 9.16237, 9.16596, 9.16954, 9.17313, 9.17671, 9.18029, 9.18387, 9.18744, 9.19102, 9.19459, 9.19817, 9.20174, 9.20531, 9.20888, 9.21244, 9.21601, 9.21957, 9.22314, 9.2267, 9.23026, 9.23382, 9.23738, 9.24093, 9.24449, 9.24804, 9.2516, 9.25515, 9.2587, 9.26225, 9.2658, 9.26934, 9.27289, 9.27644, 9.27998, 9.28353, 9.28707, 9.29061, 9.29415, 9.29769, 9.30123, 9.30477, 9.30831, 9.31185, 9.31538, 9.31892, 9.32245, 9.32599, 9.32952, 9.33306, 9.33659, 9.34012, 9.34365, 9.34718, 9.35071, 9.35424, 9.35777, 9.3613, 9.36483, 9.36836, 9.37189, 9.37541, 9.37894, 9.38247, 9.386, 9.38952, 9.39305, 9.39657, 9.4001, 9.40363, 9.40715, 9.41068, 9.4142, 9.41773, 9.42125];

var n = theta_arr.length; // Num. of frames between t = 0 and t = 2 Porb

// OR ***************************************
// compute theta_arr directly using the JavaScript function compute_theta 
// Comment out the previous two lines and uncomment the following 
//  3 lines if you want to set up theta_arr this way
//var n = 2400;
//var theta_arr = [];
//setup_theta(n);
// *******************************************

// Set up the x_arr and y_arr arrays storing Mercury's positions in 
// all these frames
var x_arr=[], y_arr=[];
for (var i=0; i<n; i++) {
    // dist. from the sun = a(1-e^2)/[1+e cos(theta)]
    var r = f1_e2/(1+e*Math.cos(theta_arr[i]));
    x_arr[i] = r*Math.cos(theta_arr[i]);
    y_arr[i] = r*Math.sin(theta_arr[i]);
}

var dt_orb = 2/n; // time between two frames in Porb
var dt_day = dt_orb*87.969; // time between two frames in days
var rad_b = Math.sqrt(1-e*e); // orbital semi-minor axis / a
// rotational angular speed = 2pi/Prot = 3pi in units of 1/Porb 
var omega_rot = 3*Math.PI; 

// Graph parameters for animation1
var xmin = -1.35, xmax = 1.15;
var ymin = -1.1, ymax = 1.4;
var Canvas = document.getElementById('animation1');
var Width = Canvas.width;
var Height = Canvas.height;
var rangeX = xmax-xmin;
var rangeY = ymax-ymin;
var scale = Height/rangeY;
var gpar1 = {"xmax":xmax, "xmin":xmin, 
             "ymin":ymin, "ymax":ymax, 
             "w":Width, "h":Height, 
             "scale":scale, "rangeX":rangeX,
             "rangeY":rangeY, "inset_width":0.59*scale};

// Graph parameters for animation2
xmin = -1.4, xmax = 5.1;
ymin = -1.1, ymax = 5.4;
Canvas = document.getElementById('animation2');
Width = Canvas.width;
Height = Canvas.height;
rangeX = xmax-xmin;
rangeY = ymax-ymin;
scale = Height/rangeY;
var gpar2 = {"xmax":xmax, "xmin":xmin, 
             "ymin":ymin, "ymax":ymax, 
             "w":Width, "h":Height, 
             "scale":scale, "rangeX":rangeX,
             "rangeY":rangeY, "inset_width":4.5*scale};

// Show the configuration at t=0
function init() {
   draw_figure();
    
   step1 = 2;
   step2 = 2;
   t1 = -step1;
   animate1(gpar1);
   document.getElementById("anim1speed1").checked = false;
   document.getElementById("anim1speed2").checked = true;
   document.getElementById("anim1speed3").checked = false;
   document.getElementById("anim1speed4").checked = false;
   document.getElementById("anim1speed5").checked = false;
   document.getElementById("anim1speed6").checked = false;
    
   t2 = -step2;
   animate2(gpar2);
   document.getElementById("anim2speed1").checked = false;
   document.getElementById("anim2speed2").checked = true;
   document.getElementById("anim2speed3").checked = false;
   document.getElementById("anim2speed4").checked = false;
   document.getElementById("anim2speed5").checked = false;
   document.getElementById("anim2speed6").checked = false;
}

// Play animation 1
function play_anim1() {
  clearInterval(animate1_id);
  t1 = -step1;
  document.getElementById("anim1Pause").value = "Pause";
  document.getElementById("anim1Start").style.display = "none";
  document.getElementById("anim1Playing").style.display = "inline";
  animate1_id = setInterval(function() {animate1(gpar1)},frame_rate);
}

function anim1PauseResume() {
    var action = document.getElementById("anim1Pause").value;
    if (action=="Pause") {
        clearInterval(animate1_id);
        document.getElementById("anim1Pause").value = "Resume";
    } else {
        document.getElementById("anim1Pause").value = "Pause";
        animate1_id = setInterval(function() {animate1(gpar1)},frame_rate);
    }
}

// Change animation1 speed
function animate1_speed(speed) {
    step1 = speed;
    document.getElementById("anim1speed1").checked = false;
    document.getElementById("anim1speed2").checked = false;
    document.getElementById("anim1speed3").checked = false;
    document.getElementById("anim1speed4").checked = false;
    document.getElementById("anim1speed5").checked = false;
    document.getElementById("anim1speed6").checked = false;
    if (speed==1) {
       document.getElementById("anim1speed1").checked = true; 
    } else if (speed==2) {
       document.getElementById("anim1speed2").checked = true;  
    } else if (speed==3) {
       document.getElementById("anim1speed3").checked = true;
    } else if (speed==4) {
       document.getElementById("anim1speed4").checked = true;
    } else if (speed==5) {
       document.getElementById("anim1speed5").checked = true;
    } else {
       document.getElementById("anim1speed6").checked = true;
    }
}

// Animation 1: plot one frame
function animate1(gpar) {
    t1 += step1;
    document.getElementById("timeAnim1").innerHTML = "t = "+(t1*dt_day).toFixed(1)+" days = "+(t1*dt_orb).toFixed(2)+" P<sub>orb</sub>";
    
    // Array index corresponding to t1
    // Note that the configuration is periodic 
    // with period n (in time steps). 
    var i = t1 % n;
    
    // set up canvas
    var Canvas = document.getElementById('animation1');
    var Ctx = Canvas.getContext('2d');
    Ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    
    // set up parameters for XC() and YC()
    // for translation from the physical coordinates to the graph 
    // coordinates
    var xpar = {"minX":gpar.xmin, "rangeX":gpar.rangeX, "Width":gpar.w};
    var ypar = {"minY":gpar.ymin, "rangeY":gpar.rangeY, "Height":gpar.h};
    
    draw(gpar, xpar, ypar, Ctx, i);
    
    // Write "Sun" in the plot
    Ctx.font="20px Arial";
    Ctx.fillStyle = "black";
    Ctx.fillText("Sun", XC(-0.2,xpar), YC(-0.03,ypar));
}

// Play animation 2
function play_anim2() {
  clearInterval(animate2_id);
  t2 = -step2;
  document.getElementById("anim2Pause").value = "Pause";
  document.getElementById("anim2Start").style.display = "none";
  document.getElementById("anim2Playing").style.display = "inline";
  animate2_id = setInterval(function() {animate2(gpar2)},frame_rate);
}

function anim2PauseResume() {
    var action = document.getElementById("anim2Pause").value;
    if (action=="Pause") {
        clearInterval(animate2_id);
        document.getElementById("anim2Pause").value = "Resume";
    } else {
        document.getElementById("anim2Pause").value = "Pause";
        animate2_id = setInterval(function() {animate2(gpar2)},frame_rate);
    }
}

// Change animation 2 speed
function animate2_speed(speed) {
    step2 = speed;
    document.getElementById("anim2speed1").checked = false;
    document.getElementById("anim2speed2").checked = false;
    document.getElementById("anim2speed3").checked = false;
    document.getElementById("anim2speed4").checked = false;
    document.getElementById("anim2speed5").checked = false;
    document.getElementById("anim2speed6").checked = false;
    if (speed==1) {
       document.getElementById("anim2speed1").checked = true; 
    } else if (speed==2) {
       document.getElementById("anim2speed2").checked = true;  
    } else if (speed==3) {
       document.getElementById("anim2speed3").checked = true;
    } else if (speed==4) {
       document.getElementById("anim2speed4").checked = true;
    } else if (speed==5) {
       document.getElementById("anim2speed5").checked = true;
    } else {
       document.getElementById("anim2speed6").checked = true;
    }
}

// Animation 2: one frame
function animate2(gpar) {
    t2 += step2;
    document.getElementById("timeAnim2").innerHTML = "t = "+(t2*dt_day).toFixed(1)+" days = "+(t2*dt_orb).toFixed(2)+" P<sub>orb</sub>";
    
    // Array index corresponding to t2
    // Note that the configuration is periodic 
    // with period n (in time steps). 
    var i = t2 % n;
    
    // set up canvas
    var Canvas = document.getElementById('animation2');
    var Ctx = Canvas.getContext('2d');
    Ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    
    // set up parameters for XC() and YC()
    var xpar = {"minX":gpar.xmin, "rangeX":gpar.rangeX, "Width":gpar.w};
    var ypar = {"minY":gpar.ymin, "rangeY":gpar.rangeY, "Height":gpar.h};
    
    draw(gpar, xpar, ypar, Ctx, i);
    
    // Write "Sun" in the plot
    Ctx.font="15px Arial";
    Ctx.fillStyle = "black";
    Ctx.fillText("Sun", XC(-0.35,xpar), YC(-0.03,ypar));
}

function draw(gpar, xpar, ypar, Ctx, i) {
    
    // true anomaly and Mercury's position
    var theta = theta_arr[i];
    var x = x_arr[i];
    var y = y_arr[i];
    // time in orbital period modulo 2
    var t = 2.0*i/n;
    
    // draw orbital ellipse: center at (-e,0)
    Ctx.beginPath();
    Ctx.ellipse(XC(-e,xpar), YC(0,ypar), gpar.scale, rad_b*gpar.scale, 
                0, 0,2*Math.PI);
    Ctx.strokeStyle = "black";
    Ctx.stroke();

    var Rp = 0.07*gpar.scale; // radius of Mercury in the plot
    
    // indicate perihelion point by a blue dot
    Ctx.beginPath();
    Ctx.arc(XC(1-e, xpar), YC(0,ypar), Rp*3/14, 0, 2*Math.PI);
    Ctx.fillStyle = "blue";
    Ctx.fill();
    
    // draw a line connecting the sun to Mercury
    var xend = 1.35*Math.cos(theta);
    var yend = 1.35*Math.sin(theta);
    Ctx.beginPath();
    Ctx.setLineDash([5,5]);
    Ctx.lineWidth = 2;
    Ctx.moveTo(XC(0, xpar),YC(0, ypar));
    Ctx.lineTo(XC(xend, xpar),YC(yend, ypar));
    Ctx.strokeStyle = "#cdcd00"
    Ctx.stroke();
    Ctx.setLineDash([]);
    Ctx.lineWidth = 1;
    
    // plot the sun (radius = 0.012 a)
    Ctx.beginPath();
    Ctx.arc(XC(0,xpar), YC(0,ypar), 0.012*gpar.scale, 0, 2*Math.PI);
    Ctx.fillStyle = "#cdba96";
    Ctx.fill();
    
    // Draw Mercury's day side
    var phi1 = 0.5*Math.PI+theta;
    var phi2 = phi1 + Math.PI;
    Ctx.beginPath();
    Ctx.arc(XC(x,xpar), YC(y,ypar), Rp, -phi1, -phi2, true);
    Ctx.fillStyle = "red";
    Ctx.fill();
    // Draw Mercury's night side
    Ctx.beginPath();
    Ctx.arc(XC(x,xpar), YC(y,ypar), Rp, -phi2, -phi1, true);
    Ctx.fillStyle = "black";
    Ctx.fill();
    
    //  plot two points on Mercury's surface
    // The first point (magenta) corresponds to 
    // the point facing the sun at perihelion (subsolar point).
    // The second point (green) is pi/2 to the west of the first point.
    var rpoint = Rp/3.5; // radius of the points in pixels
    phi1 = omega_rot*t - Math.PI;
    var xg = XC(x,xpar) + (Rp+rpoint)*Math.cos(phi1);
    var yg = YC(y,ypar) - (Rp+rpoint)*Math.sin(phi1);
    Ctx.beginPath();
    Ctx.arc(xg, yg, rpoint, 0, 2*Math.PI);
    Ctx.fillStyle = "green";
    Ctx.fill();
    phi2 = phi1 + 0.5*Math.PI;
    xg = XC(x,xpar) + (Rp+rpoint)*Math.cos(phi2);
    yg = YC(y,ypar) - (Rp+rpoint)*Math.sin(phi2);
    Ctx.beginPath();
    Ctx.arc(xg, yg, rpoint, 0, 2*Math.PI);
    Ctx.fillStyle = "magenta";
    Ctx.fill();
    
    // Draw a square on the upper right corner for the inset
    xg = XC(gpar.xmax, xpar) - gpar.inset_width;
    yg = YC(gpar.ymax, ypar);
    Ctx.beginPath();
    Ctx.rect(xg, yg, gpar.inset_width, gpar.inset_width);
    Ctx.fillStyle = "white";
    Ctx.fill();
    Ctx.strokeStyle = "black";
    Ctx.stroke();
    
    // Draw day and night sides in the inset
    var phi3 = theta-phi2;
    var phi4 = phi3+Math.PI;
    xg = xg + 0.5*gpar.inset_width;
    yg = yg + 0.5*gpar.inset_width;
    Rp = gpar.inset_width*0.39;
    Ctx.beginPath();
    Ctx.arc(xg, yg, Rp, -phi4, -phi3, true);
    Ctx.fillStyle = "red";
    Ctx.fill();
    Ctx.beginPath();
    Ctx.arc(xg, yg, Rp, -phi3, -phi4, true);
    Ctx.fillStyle = "black";
    Ctx.fill();
    // Finally, draw the 2 points in the inset
    rpoint = 4; // radius of the points in pixels
    Ctx.beginPath();
    Ctx.arc(xg, yg-Rp-rpoint, rpoint, 0, 2*Math.PI);
    Ctx.fillStyle = "magenta";
    Ctx.fill();
    Ctx.beginPath();
    Ctx.arc(xg+Rp+rpoint, yg, rpoint, 0, 2*Math.PI);
    Ctx.fillStyle = "green";
    Ctx.fill();
}

function draw_figure() {
    // Set up canvas
    var xmax = 1.1, xmin = -1.4, ymax=1.25, ymin=-1.25;
    var Canvas = document.getElementById('figure');
    var Width = Canvas.width;
    var Height = Canvas.height;
    var rangeX = xmax-xmin;
    var rangeY = ymax-ymin;
    var scale = Height/rangeY;
    var Ctx = Canvas.getContext('2d');
    Ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    
    // set up parameters for XC() and YC()
    // for translation from the physical coordinates to the graph 
    // coordinates
    var xpar = {"minX":xmin, "rangeX":rangeX, "Width":Width};
    var ypar = {"minY":ymin, "rangeY":rangeY, "Height":Height};
    
    // Plot the configuration at perihelion
    var theta = 0, x=1-e, y=0;
    
    // draw orbital ellipse: center at (-e,0)
    Ctx.beginPath();
    Ctx.ellipse(XC(-e,xpar), YC(0,ypar), scale, rad_b*scale, 
                0, 0,2*Math.PI);
    Ctx.strokeStyle = "black";
    Ctx.stroke();
        
    // draw a line connecting the sun to Mercury
    var xend = 1.1;
    var yend = 0;
    Ctx.beginPath();
    Ctx.setLineDash([5,5]);
    Ctx.lineWidth = 2;
    Ctx.moveTo(XC(0, xpar),YC(0, ypar));
    Ctx.lineTo(XC(xend, xpar),YC(yend, ypar));
    Ctx.strokeStyle = "#cdcd00"
    Ctx.stroke();
    Ctx.setLineDash([]);
    Ctx.lineWidth = 1;
    
    // plot the sun (radius = 0.012 a)
    Ctx.beginPath();
    Ctx.arc(XC(0,xpar), YC(0,ypar), 0.012*scale, 0, 2*Math.PI);
    Ctx.fillStyle = "#cdba96";
    Ctx.fill();
    
    var Rp = 0.07*scale; // radius of Mercury in the plot
    // Draw Mercury's day side
    var phi1 = 0.5*Math.PI;
    var phi2 = phi1 + Math.PI;
    Ctx.beginPath();
    Ctx.arc(XC(x,xpar), YC(y,ypar), Rp, -phi1, -phi2, true);
    Ctx.fillStyle = "red";
    Ctx.fill();
    // Draw Mercury's night side
    Ctx.beginPath();
    Ctx.arc(XC(x,xpar), YC(y,ypar), Rp, -phi2, -phi1, true);
    Ctx.fillStyle = "black";
    Ctx.fill();
    
    //  plot two points on Mercury's surface
    // The first point (magenta) corresponds to 
    // the point facing the sun at perihelion (subsolar point).
    // The second point (green) is pi/2 to the west of the first point.
    var rpoint = Rp/3.5; // radius of the points in pixels
    phi1 = 0.5*Math.PI;
    var xg = XC(x,xpar) + (Rp+rpoint)*Math.cos(phi1);
    var yg = YC(y,ypar) - (Rp+rpoint)*Math.sin(phi1);
    Ctx.beginPath();
    Ctx.arc(xg, yg, rpoint, 0, 2*Math.PI);
    Ctx.fillStyle = "green";
    Ctx.fill();
    phi2 = Math.PI;
    xg = XC(x,xpar) + (Rp+rpoint)*Math.cos(phi2);
    yg = YC(y,ypar) - (Rp+rpoint)*Math.sin(phi2);
    Ctx.beginPath();
    Ctx.arc(xg, yg, rpoint, 0, 2*Math.PI);
    Ctx.fillStyle = "magenta";
    Ctx.fill();
    
    // Annotate the plot
    Ctx.font="20px Arial";
    Ctx.fillStyle = "black";
    Ctx.fillText("Sun", XC(-0.2,xpar), YC(-0.03,ypar));
    Ctx.fillText("P", XC(1-e-0.18,xpar), YC(-0.03,ypar));
    Ctx.fillText("Q", XC(1-e-0.02,xpar), YC(0.12,ypar));
    Ctx.fillText("Mercury at", XC(0.55,xpar), YC(-0.15,ypar));
    Ctx.fillText("perihelion", XC(0.57,xpar), YC(-0.25,ypar));
}

// Returns the canvas x-coordinate of a mathematical x-coordinate:
// p is an object with 3 properties: minX, rangeX and Width,
// where minX is the minimum value of x, rangeX = maxX-minX, and 
// Width is the width of the graph (in pixels)
function XC(x, p) {
  return (x - p.minX)/p.rangeX * p.Width;
}

// Returns the canvas y-coordinate of a mathematical y-coordinate:
// p is an object with 3 properties: minY, rangeY and Height,
// where minY is the minimum value of y, rangeY = maxY-minY, and 
// Height is the height of the graph (in pixels)
function YC(y, p) {
  return p.Height - (y - p.minY)/p.rangeY * p.Height;
}

// Set up theta_arr by calling the function compute_theta
function setup_theta(n) {
    var i, M;
    var DeltaM = 4*Math.PI/n;
    for (i=0; i<n; i++) {
        M = i*DeltaM - Math.PI;
        theta_arr[i] = compute_theta(M, e);
    }
}

// Given the mean anomaly M and eccentricity e, compute true anomaly theta.
// M and theta are all in radians.
//
// Eccentric anomaly E and M are related by Kepler's equation E - e sin E = M.
// This code has been tested for a number of e's with e < 1
// and works well even for e very close to 1. An integer multiples of 2 pi is
// subtracted from M to create a new variable Mp so that -pi <= Mp < pi. Kepler's
// equation Ep - e sin Ep = Mp is solved. 
// Kepler's equation is solved primilarily by Newton's
// method. For e < 0.8, the initial guess is E = M. For e > 0.8, this
// initial guess does not always work well, and E = pi is used instead, as sugested
// in Astronomy on the Personal Computer by Montenbruck and Pfleger. However, even
// this new guess does not guarantee convergence within 100 iterations. When 100 iterations
// is reached, the solver quits and the equation is solved by the method of bisection.
// It is easy to see that when Mp < 0, -pi <= Ep < 0; when Mp > 0, 0 < Ep < pi and
// the bisection method can always find the root with an accuracy of 1.7e-16 after
// 54 iterations.
function compute_theta(M, e) {
    // mean anomaly -> [-pi, pi)
  var n2pi = Math.floor(M/(2.0*Math.PI) + 0.5) * (2.0*Math.PI);
  var Mp = M - n2pi;

  // Solve Kepler's equation E - e sin E = M using Newton's iteration method
  var E = Mp; // initial guess
  if (e > 0.8) {E = Math.PI;} // need another initial guess for very eccentric orbit
  var E0 = E*1.01;
  var tol = 1.e-15;
  var iter = 0, maxit = 100;
  while (Math.abs(E-E0) > tol && iter < maxit) {
    E0 = E;
    E = E0 - (E0 - e*Math.sin(E0) - Mp)/(1.0 - e*Math.cos(E0));
    iter++;
  }
  if (iter==maxit) {
    // Newton's iteration doesn't converge after 100 iterations, use bisection instead.
    iter = 0; maxit = 60;
    if (Mp > 0.0) {
      E0 = 0.0; E = Math.PI;
    } else {
      E = 0.0; E0 = -Math.PI;
    }
    while (E-E0 > tol && iter < maxit) {
      var E1 = 0.5*(E+E0);
      var z = E1 - e*Math.sin(E1) - Mp;
      if (z > 0.0) {
        E = E1;
      } else {
        E0 = E1;
      }
      iter++;
    }
  }

  var x = Math.cos(E) - e;
  var y = Math.sqrt(1.0-e*e) * Math.sin(E);
  var theta = Math.atan2(y,x) + n2pi;
  return(theta);
}