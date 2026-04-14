import * as algebra from './algebra';
import * as geometry from './geometry';
import * as statistics from './statistics';
import * as probability from './probability';
import * as trigonometry from './trigonometry';
import * as coordinateGeometry from './coordinateGeometry';
import * as arithmetic from './arithmetic';
import * as wordProblems from './wordProblems';
import * as functions from './functions';
import * as numberQuantity from './numberQuantity';
import * as essentialSkills from './essentialSkills';
import * as multiSkill from './multiSkill';

export const generators = [
  // 0-9
  algebra.generateLinearEquationEasy,
  statistics.generateMeanEasy,
  probability.generateSimpleProbabilityMedium,
  algebra.generateMatricesEasy,
  trigonometry.generateRightTriangleTrigMedium,
  coordinateGeometry.generateSlopeMedium,
  coordinateGeometry.generateMidpointMedium,
  coordinateGeometry.generateDistanceEasy,
  algebra.generateComplexNumbersSum,
  algebra.generateLogarithmsEasy,
  
  // 10-19
  algebra.generateSystemsOfEquationsEasy,
  algebra.generateFunctionsEasy,
  algebra.generateExponentsEasy,
  arithmetic.generatePercentagesEasy,
  geometry.generateCirclesAreaEasy,
  geometry.generateRightTrianglesPythagorean,
  algebra.generateQuadraticsFactoring,
  arithmetic.generateRatiosMedium,
  algebra.generateAbsoluteValueEasy,
  arithmetic.generateScientificNotationEasy,
  
  // 20-29
  algebra.generateLinearEquationMedium,
  algebra.generateInequalitiesMedium,
  algebra.generateRationalExpressionsEasy,
  algebra.generateQuadraticsHard,
  algebra.generateQuadraticsVertex,
  algebra.generateFunctionsComposition,
  algebra.generateFunctionsInverse,
  algebra.generateSystemsOfEquationsHard,
  geometry.generateSimilarTrianglesMedium,
  geometry.generateAnglesParallelLines,
  
  // 30-39
  geometry.generateSpecialRightTriangles306090,
  geometry.generateSpecialRightTriangles454590,
  geometry.generateArcLengthMedium,
  geometry.generateSectorAreaMedium,
  geometry.generateTangentCircleMedium,
  geometry.generateVolumeCylinderMedium,
  wordProblems.generateRatesMedium,
  wordProblems.generateWorkMedium,
  wordProblems.generateMixturesHard,
  wordProblems.generateUnitConversionEasy,
  
  // 40-49
  statistics.generatePermutationsMedium,
  statistics.generateCombinationsMedium,
  statistics.generateMedianMedium,
  statistics.generateIQRMedium,
  statistics.generateWeightedMeanMedium,
  multiSkill.generateCoordinateGeometryLinesMulti,
  multiSkill.generateSimilarityTrigMulti,
  multiSkill.generateCirclesAlgebraMulti,
  algebra.generateComplexNumbersProduct,
  algebra.generateLogarithmsHard,
  
  // 50-59
  numberQuantity.generateRemaindersHard,
  algebra.generateRadicalsEasy,
  algebra.generateQuadraticFormula,
  algebra.generateDomainHard,
  algebra.generatePiecewiseFunctions,
  geometry.generateCompositeAreaHard,
  coordinateGeometry.generateCoordinateAreaHard,
  geometry.generateSurfaceAreaCylinderHard,
  probability.generateCompoundProbabilityHard,
  algebra.generateSequencesMedium,
  
  // 60-69
  arithmetic.generatePercentChangeMedium,
  arithmetic.generateUnitRatesEasy,
  trigonometry.generateTrigApplicationsMedium,
  functions.generateIdentifyingGraphsMedium,
  functions.generateTransformationsMedium,
  functions.generateRangeMedium,
  functions.generateExponentialGrowthMedium,
  functions.generatePolynomialZerosMedium,
  functions.generateGeometricSequencesMedium,
  functions.generateFunctionNotationMedium,
  
  // 70-79
  functions.generateVerticalLineTestMedium,
  numberQuantity.generateVectorsMedium,
  numberQuantity.generateMatricesMultiplicationMedium,
  numberQuantity.generateRationalExponentsMedium,
  numberQuantity.generateNegativeExponentsEasy,
  numberQuantity.generateLCMGCFEasy,
  essentialSkills.generateDataInterpretationMedium,
  essentialSkills.generateModelingYIntercept,
  essentialSkills.generateModelingLinearEquation,
  essentialSkills.generateProportionalReasoningMap,
  
  // 80-89
  essentialSkills.generateStatisticsMeanMedianComparison,
  essentialSkills.generateDataInterpretationPieChart,
  essentialSkills.generateModelingSimpleInterest,
  essentialSkills.generateProportionalReasoningShadows,
  trigonometry.generateTrigRatiosMedium,
  trigonometry.generateTrigGraphsMedium,
  trigonometry.generateTrigRadiansMedium,
  trigonometry.generateTrigUnitCircleMedium,
  coordinateGeometry.generatePerpendicularLineMedium,
  coordinateGeometry.generateCircleEquationMedium,
  
  // 90-99
  coordinateGeometry.generateCoordinateInequalityMedium,
  arithmetic.generateOrderOfOperations1,
  arithmetic.generateOrderOfOperations2,
  arithmetic.generateOrderOfOperations3,
  arithmetic.generateOrderOfOperations4,
  geometry.generatePolygonSumAngles,
  geometry.generatePolygonInteriorAngle,
  geometry.generatePolygonExteriorAngle,
  geometry.generateQuadrilateralAngles,
  geometry.generateVolumeConeMedium,
  
  // 100-109
  geometry.generateVolumeSphereMedium,
  geometry.generateSurfaceAreaSphereMedium,
  geometry.generateVolumeRatioConeCylinder,
  essentialSkills.generateModelingCorrelation,
  essentialSkills.generateModelingStrongCorrelation,
  essentialSkills.generateModelingPrediction,
  essentialSkills.generateModelingSlopeInterpretation,
  trigonometry.generateTrigIdentities1,
  trigonometry.generateTrigIdentities2,
  trigonometry.generateTrigIdentities3,
  
  // 110-119
  trigonometry.generateTrigIdentities4,
  trigonometry.generateInverseTrig1,
  trigonometry.generateInverseTrig2,
  trigonometry.generateInverseTrig3,
  statistics.generateModeMedium,
  statistics.generateBimodalMedium,
  statistics.generateMeasuresOfCenterComparison,
  coordinateGeometry.generateParallelLineMedium,
  coordinateGeometry.generateParallelLineFractional,
  coordinateGeometry.generateParallelLineThroughPoint,
];
