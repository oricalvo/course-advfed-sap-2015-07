using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace UploadFileAsync.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Upload(IEnumerable<HttpPostedFileBase> files)
        {
            string imagesDirPath = Server.MapPath("~/App_Data/Images");
            if (!Directory.Exists(imagesDirPath))
            {
                Directory.CreateDirectory(imagesDirPath);
            }

            foreach (var file in files)
            {
                string fileName = Path.GetFileName(file.FileName);
                string filePath = Path.Combine(imagesDirPath, fileName);

                file.SaveAs(filePath);
            }

            return Json(true);
        }
    }
}