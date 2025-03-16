import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RefreshCw, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-context';
import packagesData from '../package.json';

const preNumbers = [
  169, 170, 149, 150, 171, 168, 136, 137, 138, 545, 505, 636, 164, 165, 172,
  623, 506, 519, 154, 155, 567, 173, 159, 160, 604, 274, 275, 295, 637, 292,
  492, 289, 677, 294, 493, 279, 280, 288, 284, 285, 638, 291, 640, 293, 675,
  282, 283, 286, 287, 296, 297, 290, 400, 401, 404, 405, 397, 398, 399, 647,
  502, 584, 402, 403, 392, 393, 395, 396, 386, 387, 503, 444, 551, 447, 561,
  445, 718, 83, 446, 448, 552, 543, 442, 443, 51, 52, 53, 58, 55, 617, 57, 618,
  59, 60, 61, 62, 544, 56, 571, 593, 667, 348, 586, 338, 339, 343, 344, 346,
  337, 554, 469, 537, 345, 470, 341, 342, 483, 484, 557, 418, 416, 417, 412,
  413, 592, 612, 613, 406, 407, 421, 598, 419, 385, 420, 528, 213, 214, 205,
  206, 498, 568, 711, 217, 218, 221, 582, 483, 625, 576, 578, 227, 208, 209,
  225, 577, 712, 215, 216, 626, 627, 579, 713, 499, 222, 219, 220, 500, 501,
  623, 497, 223, 689, 487, 226, 224, 486, 211, 212, 628, 202, 203, 531, 488,
  261, 273, 630, 264, 518, 631, 258, 259, 570, 265, 268, 269, 653, 517, 569,
  267, 262, 263, 593, 266, 693, 271, 272, 694, 270, 516, 333, 334, 691, 323,
  322, 595, 395, 641, 596, 336, 335, 496, 337, 324, 325, 394, 330, 332, 331,
  687, 422, 423, 599, 600, 688, 424, 425, 426, 550, 697, 384, 377, 378, 558,
  385, 646, 375, 376, 372, 373, 379, 380, 383, 674, 381, 382, 676, 722, 542,
  312, 313, 317, 310, 311, 302, 303, 583, 321, 382, 304, 305, 536, 605, 308,
  309, 306, 307, 319, 313, 314, 606, 320, 698, 298, 299, 535, 315, 316, 318,
  607, 608, 508, 538, 728, 509, 438, 439, 580, 590, 559, 588, 431, 432, 37, 38,
  702, 240, 241, 670, 648, 252, 678, 253, 649, 513, 546, 671, 246, 247, 654,
  548, 547, 655, 248, 249, 253, 514, 665, 673, 228, 229, 230, 679, 256, 257,
  244, 245, 681, 723, 236, 237, 683, 656, 250, 251, 515, 242, 243, 515, 238,
  239, 657, 255, 684, 700, 642, 457, 456, 458, 459, 460, 530, 520, 358, 359,
  682, 703, 364, 365, 371, 701, 720, 366, 367, 704, 361, 362, 369, 370, 635,
  668, 533, 705, 699, 669, 725, 597, 611, 525, 181, 527, 585, 685, 663, 192,
  193, 174, 175, 183, 184, 481, 706, 194, 195, 185, 186, 182, 199, 200, 198,
  662, 190, 191, 692, 189, 707, 526, 187, 188, 729, 730, 196, 197, 661, 680,
  643, 562, 572, 74, 644, 72, 73, 69, 70, 521, 573, 522, 724, 76, 77, 650, 574,
  78, 79, 81, 84, 651, 86, 87, 89, 90, 553, 91, 92, 93, 94, 97, 98, 96, 105,
  106, 63, 67, 68, 75, 591, 82, 635, 524, 468, 465, 461, 462, 467, 632, 555,
  633, 629, 466, 696, 721, 64, 65, 523, 652, 719, 716, 85, 88, 563, 529, 353,
  349, 350, 355, 609, 351, 352, 354, 732, 357, 532, 610, 356, 556, 658, 1, 2, 3,
  4, 5, 6, 7, 8, 11, 20, 25, 15, 43, 666, 489, 44, 45, 48, 49, 490, 491, 695,
  659, 31, 32, 664, 717, 41, 42, 471, 472, 454, 581, 449, 450, 616, 534, 455,
  451, 726, 634, 453, 727, 452, 145, 146, 731, 690, 601, 504, 163, 714, 715,
  566, 166, 167, 161, 162, 686, 603, 619, 118, 127, 128, 129, 620, 621, 549,
  564, 575, 113, 114, 122, 540, 660, 120, 512, 510, 511, 119, 115, 112, 110,
  111, 125, 126, 565, 121, 116, 117, 541, 622, 124, 108, 109, 123, 428, 427,
  507, 158, 615, 152, 153,
];

const App = () => {
  const [inputCode, setInputCode] = useState('0123456789');
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<boolean | null>(
    null,
  );
  const { theme, toggleTheme } = useTheme();

  const validateCode = (code: string) => {
    setIsValidating(true);

    // Simulate API call with a slight delay
    setTimeout(() => {
      const order = [10, 9, 8, 7, 6, 5, 4, 3, 2, 0];

      let sumNumber = 0;
      for (let i = 0; i < code.length; i++) {
        sumNumber += Number.parseInt(code[i]) * order[i];
      }

      let controlNumber = null;

      if (sumNumber % 11 === 0) {
        controlNumber = 0;
      } else if (sumNumber % 11 === 1) {
        controlNumber = 1;
      } else if (sumNumber % 11 > 1) {
        controlNumber = 11 - (sumNumber % 11);
      }

      console.log(Number(code.slice(0, 3)));

      setValidationResult(
        controlNumber === Number(code[code.length - 1]) &&
          preNumbers.includes(Number(code.slice(0, 3))),
      );
      setIsValidating(false);
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 transition-colors duration-200">
      <Card className="w-full max-w-md shadow-lg dark:bg-slate-800 dark:border-slate-700 transition-colors duration-200">
        <CardHeader className="space-y-1 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="absolute right-4 top-4 rounded-full h-8 w-8"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          <CardTitle className="text-2xl font-bold text-center pt-2 dark:text-white">
            Iranian National ID Validator
          </CardTitle>
          <CardDescription className="text-center dark:text-slate-400">
            Enter your 10-digit code to verify its authenticity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="text"
                placeholder="Enter your code"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="text-center text-lg tracking-wider dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                maxLength={10}
              />
              <Button
                onClick={() => validateCode(inputCode)}
                disabled={inputCode.length !== 10 || isValidating}
                className="shrink-0 w-full sm:w-auto"
              >
                {isValidating ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {isValidating ? 'Validating...' : 'Validate'}
              </Button>
            </div>

            {validationResult !== null && (
              <div
                className={`mt-6 rounded-lg p-4 ${
                  validationResult
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {validationResult ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                      <span className="font-medium text-green-700 dark:text-green-400">
                        Valid code confirmed
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                      <span className="font-medium text-red-700 dark:text-red-400">
                        Invalid code detected
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-md bg-slate-50 dark:bg-slate-700 p-3">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Code Format
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Validates Iranian National Identification Numbers (NIT) for
              correctness.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <Badge
              variant="outline"
              className="text-xs dark:border-slate-600 dark:text-slate-300"
            >
              v{packagesData.version}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setValidationResult(null)}
            className="w-full sm:w-auto"
          >
            Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;
