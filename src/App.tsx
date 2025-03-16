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

      setValidationResult(controlNumber === Number(code[code.length - 1]));
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
