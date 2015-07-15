using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LocalAndSessionStorage.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Offline()
        {
            return View();
        }

        public ActionResult NonOffline()
        {
            return View();
        }
    }
}
