using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UploadCanvas.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SaveImage(string imageData)
        {
            imageData = imageData.Replace("data:image/png;base64,", "");

            byte[] bytes = Convert.FromBase64String(imageData);

            string filePath = Server.MapPath("~/App_Data/image.png");
            using (FileStream fs = System.IO.File.Create(filePath))
            {
                fs.Write(bytes, 0, bytes.Length);
            }

            return Json(true);
        }
    }
}
