
// 引入docsify-demo-box-vue
var jsResources = '<scr' + 'ipt src="//unpkg.com/vue/dist/vue.js"></scr' + 'ipt>'
var cssResources = '@import url("//cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css");'
var bootCode = 'var globalVariable = "leon"'
var globalVariable = "leon"

window.$docsify = {
  name: 'web-books',
  // loadNavbar: true,
  maxLevel: 6,
  auto2top: true,
  autoHeader: true,

  loadSidebar: true,
  subMaxLevel: 3,

  // disqus: 'yangpeng',
  // 搜索完整配置参数
  search: {
    placeholder: '请输入关键字',
    noData: '暂无结果',
    // 搜索标题的最大程级, 1 - 6
    depth: 6
  },

  plugins: [
    DemoBoxVue.create(jsResources, cssResources, bootCode),
    function (hook) {
      hook.doneEach(function () {

        // let max_cengji = 2;    //默认展开层级深度
        // //添加箭头
        // $('.sidebar-nav').find('li').each(function (i, e) {
        //   var el = e;
        //   if (el.nextSibling && el.nextSibling.tagName == 'UL') {
        //     $(el).addClass('sidebar-nav-parent-li').append(
        //       "<div class='ul-after'><div class='ul-after-sanjiao'></div></div>");
        //   }
        // })

        // //初始时候展开层级

        // function find_children_li(dom, current_cengji) {
        //   if (dom) {
        //     current_cengji++;
        //     $($(dom).find('li').each(function (i, e) {
        //       var el = e;
        //       if (el.nextSibling && el.nextSibling.tagName == 'UL') {
        //         if (current_cengji >= max_cengji) {
        //           $(el.nextSibling).hide();
        //           $(el).addClass('sidebar-nav-parent-li-shouqi');
        //         }
        //         find_children_li(el.nextSibling, current_cengji);
        //       }
        //     }))
        //   } else {
        //     return
        //   }
        // }

        // find_children_li($('.sidebar-nav')[0], 0);

        // //绑定事件
        // $('.ul-after-sanjiao').on('click', function (e) {
        //   e.stopPropagation();
        //   e.preventDefault();
        //   var el = e.target.parentNode.parentNode.nextSibling;
        //   if (el) {
        //     $(el).toggle();
        //     if ($(e.target.parentNode.parentNode).hasClass('sidebar-nav-parent-li-shouqi')) {
        //       $(e.target.parentNode.parentNode).removeClass('sidebar-nav-parent-li-shouqi');
        //     } else {
        //       $(e.target.parentNode.parentNode).addClass('sidebar-nav-parent-li-shouqi');
        //     }
        //   }
        // })


        //回到顶部
        let return_top = $('<div class="return-top"><div class="return-top-div">顶</div></div>')
        $('html').append(return_top);
        $(window).scroll(function () {
          var scroll = $(window).scrollTop();
          if (scroll > 1000) {
            $(return_top).show();
          } else {
            $(return_top).hide();
          }
        })
        return_top.on('click', function (e) {
          $('html,body').animate({
            scrollTop: 0
          }, 500)
        })
      })
    }
  ]
}
