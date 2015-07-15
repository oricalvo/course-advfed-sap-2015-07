using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            foreach (var en in Encoding.GetEncodings())
            {
                if (en.DisplayName.Contains("Hebrew"))
                {
                    Console.WriteLine(en.CodePage + ", " + en.DisplayName);
                }
            }

            using (FileStream fs = new FileStream(@"F:\Computer Guard\Dev\Src\CardDesigner\FixedCSVMigration\32995.dat", FileMode.Open, FileAccess.Read))
            using (StreamReader reader = new StreamReader(fs, Encoding.GetEncoding(1255)))
            {
                string line = reader.ReadLine();
                while (line != null)
                {
                    line = reader.ReadLine();
                }
            }
        }
    }
}
