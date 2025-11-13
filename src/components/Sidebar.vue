<template>
  <!--侧边栏--->
  <aside
    id="secondary"
    class="widget-area bloglo-sidebar-container"
    role="complementary"
  >
    <div class="bloglo-sidebar-inner">
      <!--个人信息-->
      <div
        id="block-16"
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_block"
      >
        <div class="is-content-justification-left is-nowrap is-layout-flex">
          <div class="wp-block-image is-style-rounded">
            <figure class="alignleft size-large is-resized">
              <img
                loading="lazy"
                decoding="async"
                width="1024"
                height="731"
                src="https://java-ai-sau.oss-cn-beijing.aliyuncs.com/2025/04/312b700a-e1c7-42bf-aa23-5db8dc7121a6.jpg"
                alt=""
                style="object-fit: cover; width: 70px; height: 70px"
                sizes="auto, (max-width: 1024px) 100vw, 1024px"
              />
            </figure>
          </div>
          <p style="font-size: 1.6rem">
            <strong>赵瑾瑜</strong><br />开发者 &amp; 编辑
          </p>
        </div>
        <p style="font-size: 1.6rem">
          你好！我是赵瑾瑜，一位在读的大学生。该Blog使用Vue+SpringBoot进行独立开发
        </p>
        <ul
          class="wp-block-social-links is-style-default is-horizontal is-content-justification-left is-layout-flex wp-container-core-social-links-is-layout-d6c063d9 wp-block-social-links-is-layout-flex"
        >
          <li
            class="wp-social-link wp-social-link-facebook wp-block-social-link"
          >
            <a href="" class="wp-block-social-link-anchor">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z"
                ></path>
              </svg>
            </a>
          </li>

          <li
            class="wp-social-link wp-social-link-twitter wp-block-social-link"
          >
            <a href="" class="wp-block-social-link-anchor">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M22.23,5.924c-0.736,0.326-1.527,0.547-2.357,0.646c0.847-0.508,1.498-1.312,1.804-2.27 c-0.793,0.47-1.671,0.812-2.606,0.996C18.324,4.498,17.257,4,16.077,4c-2.266,0-4.103,1.837-4.103,4.103 c0,0.322,0.036,0.635,0.106,0.935C8.67,8.867,5.647,7.234,3.623,4.751C3.27,5.357,3.067,6.062,3.067,6.814 c0,1.424,0.724,2.679,1.825,3.415c-0.673-0.021-1.305-0.206-1.859-0.513c0,0.017,0,0.034,0,0.052c0,1.988,1.414,3.647,3.292,4.023 c-0.344,0.094-0.707,0.144-1.081,0.144c-0.264,0-0.521-0.026-0.772-0.074c0.522,1.63,2.038,2.816,3.833,2.85 c-1.404,1.1-3.174,1.756-5.096,1.756c-0.331,0-0.658-0.019-0.979-0.057c1.816,1.164,3.973,1.843,6.29,1.843 c7.547,0,11.675-6.252,11.675-11.675c0-0.178-0.004-0.355-0.012-0.531C20.985,7.47,21.68,6.747,22.23,5.924z"
                ></path>
              </svg>
            </a>
          </li>

          <li
            class="wp-social-link wp-social-link-instagram wp-block-social-link"
          >
            <a href="" class="wp-block-social-link-anchor">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M12,4.622c2.403,0,2.688,0.009,3.637,0.052c0.877,0.04,1.354,0.187,1.671,0.31c0.42,0.163,0.72,0.358,1.035,0.673 c0.315,0.315,0.51,0.615,0.673,1.035c0.123,0.317,0.27,0.794,0.31,1.671c0.043,0.949,0.052,1.234,0.052,3.637 s-0.009,2.688-0.052,3.637c-0.04,0.877-0.187,1.354-0.31,1.671c-0.163,0.42-0.358,0.72-0.673,1.035 c-0.315,0.315-0.615,0.51-1.035,0.673c-0.317,0.123-0.794,0.27-1.671,0.31c-0.949,0.043-1.233,0.052-3.637,0.052 s-2.688-0.009-3.637-0.052c-0.877-0.04-1.354-0.187-1.671-0.31c-0.42-0.163-0.72-0.358-1.035-0.673 c-0.315-0.315-0.51-0.615-0.673-1.035c-0.123-0.317-0.27-0.794-0.31-1.671C4.631,14.688,4.622,14.403,4.622,12 s0.009-2.688,0.052-3.637c0.04-0.877,0.187-1.354,0.31-1.671c0.163-0.42,0.358-0.72,0.673-1.035 c0.315-0.315,0.615-0.51,1.035-0.673c0.317-0.123,0.794-0.27,1.671-0.31C9.312,4.631,9.597,4.622,12,4.622 M12,3 C9.556,3,9.249,3.01,8.289,3.054C7.331,3.098,6.677,3.25,6.105,3.472C5.513,3.702,5.011,4.01,4.511,4.511 c-0.5,0.5-0.808,1.002-1.038,1.594C3.25,6.677,3.098,7.331,3.054,8.289C3.01,9.249,3,9.556,3,12c0,2.444,0.01,2.751,0.054,3.711 c0.044,0.958,0.196,1.612,0.418,2.185c0.23,0.592,0.538,1.094,1.038,1.594c0.5,0.5,1.002,0.808,1.594,1.038 c0.572,0.222,1.227,0.375,2.185,0.418C9.249,20.99,9.556,21,12,21s2.751-0.01,3.711-0.054c0.958-0.044,1.612-0.196,2.185-0.418 c0.592-0.23,1.094-0.538,1.594-1.038c0.5-0.5,0.808-1.002,1.038-1.594c0.222-0.572,0.375-1.227,0.418-2.185 C20.99,14.751,21,14.444,21,12s-0.01-2.751-0.054-3.711c-0.044-0.958-0.196-1.612-0.418-2.185c-0.23-0.592-0.538-1.094-1.038-1.594 c-0.5-0.5-1.002-0.808-1.594-1.038c-0.572-0.222-1.227-0.375-2.185-0.418C14.751,3.01,14.444,3,12,3L12,3z M12,7.378 c-2.552,0-4.622,2.069-4.622,4.622S9.448,16.622,12,16.622s4.622-2.069,4.622-4.622S14.552,7.378,12,7.378z M12,15 c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,15,12,15z M16.804,6.116c-0.596,0-1.08,0.484-1.08,1.08 s0.484,1.08,1.08,1.08c0.596,0,1.08-0.484,1.08-1.08S17.401,6.116,16.804,6.116z"
                ></path>
              </svg>
            </a>
          </li>

          <li
            class="wp-social-link wp-social-link-linkedin wp-block-social-link"
          >
            <a href="" class="wp-block-social-link-anchor">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M19.7,3H4.3C3.582,3,3,3.582,3,4.3v15.4C3,20.418,3.582,21,4.3,21h15.4c0.718,0,1.3-0.582,1.3-1.3V4.3 C21,3.582,20.418,3,19.7,3z M8.339,18.338H5.667v-8.59h2.672V18.338z M7.004,8.574c-0.857,0-1.549-0.694-1.549-1.548 c0-0.855,0.691-1.548,1.549-1.548c0.854,0,1.547,0.694,1.547,1.548C8.551,7.881,7.858,8.574,7.004,8.574z M18.339,18.338h-2.669 v-4.177c0-0.996-0.017-2.278-1.387-2.278c-1.389,0-1.601,1.086-1.601,2.206v4.249h-2.667v-8.59h2.559v1.174h0.037 c0.356-0.675,1.227-1.387,2.526-1.387c2.703,0,3.203,1.779,3.203,4.092V18.338z"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
      <!--热点-->
      <div
        id="block-7"
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_block"
      >
        <div class="h4 widget-title">热点</div>
        <ul class="has-dates has-author">
          <li>
            <div class="wp-block-latest-posts__featured-image">
              <a
                href=""
                ><img
                  loading="lazy"
                  decoding="async"
                  width="1024"
                  height="731"
                  src="https://demo.peregrine-themes.com/bloglo/blogmate/wp-content/uploads/sites/12/2024/01/StockSnap_DBHIOSA9CB-1024x731.jpg"
                  class="attachment-large size-large"
                  alt=""
                  style=""
                  sizes="auto, (max-width: 1024px) 100vw, 1024px"
              /></a>
            </div>
            <a
              class="wp-block-latest-posts__post-title"
              href=""
              >流动的色彩絮语</a
            >
            <div class="wp-block-latest-posts__post-author">
              by peregrinethemes
            </div>
            <time
              datetime="2023-07-24T20:06:55+00:00"
              class="wp-block-latest-posts__post-date"
            >
              July 24, 2023
            </time>
          </li>
        </ul>
        <ul
          class="wp-block-latest-posts__list has-dates has-author wp-block-latest-posts"
        >
          <li>
            <div class="wp-block-latest-posts__featured-image alignleft">
              <a
                href="https://demo.peregrine-themes.com/bloglo/blogmate/2023/07/24/acknowledgment-insipidity-strikingly-is-welcome/"
                ><img
                  loading="lazy"
                  decoding="async"
                  width="150"
                  height="150"
                  src="https://demo.peregrine-themes.com/bloglo/blogmate/wp-content/uploads/sites/12/2024/01/StockSnap_I4ZAJDDXBA-150x150.jpg"
                  class="attachment-thumbnail size-thumbnail wp-post-image"
                  alt=""
                  style="max-width: 75px; max-height: 75px"
              /></a>
            </div>
            <a
              class="wp-block-latest-posts__post-title"
              href="https://demo.peregrine-themes.com/bloglo/blogmate/2023/07/24/acknowledgment-insipidity-strikingly-is-welcome/"
              >时空里的狂想</a
            >
            <div class="wp-block-latest-posts__post-author">
              by peregrinethemes
            </div>
            <time
              datetime="2023-07-24T19:53:21+00:00"
              class="wp-block-latest-posts__post-date"
            >
              July 24, 2023
            </time>
          </li>
        </ul>
      </div>
      <!--搜索-->
      <div
        id="block-8"
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_block widget_search"
      >
        <form
          role="search"
          method="get"
          action="https://demo.peregrine-themes.com/bloglo/blogmate/"
          class="wp-block-search__button-outside wp-block-search__icon-button wp-block-search"
        >
          <label class="wp-block-search__label" for="wp-block-search__input-2"
            >搜索</label
          >
          <div class="wp-block-search__inside-wrapper">
            <input
              class="wp-block-search__input"
              id="wp-block-search__input-2"
              placeholder=""
              value=""
              type="search"
              name="s"
              required
            />
            <button
              class="wp-block-search__button has-icon wp-element-button"
              type="submit"
            >
              <svg
                class="search-icon"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  d="M13 5c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l-3.8 3.8 1.1 1.1 3.8-3.8c1 .8 2.3 1.3 3.7 1.3 3.3 0 6-2.7 6-6S16.3 5 13 5zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
      <!--分类-->
      <div
        id="block-9"
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_block"
      >
        <h2 class="wp-block-heading">分类</h2>

        <ul class="wp-block-categories-list wp-block-categories">
          <li class="cat-item cat-item-2">
            <a
              href="https://demo.peregrine-themes.com/bloglo/blogmate/category/beauty/"
              >美观</a
            >
          </li>
          <li class="cat-item cat-item-3">
            <a
              href="https://demo.peregrine-themes.com/bloglo/blogmate/category/fashion/"
              >时尚</a
            >
          </li>
        </ul>
      </div>
      <!--标签-->
      <div
        id="block-10"
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_block"
      >
        <div class="h4 widget-title">标签</div>
        <div class="wp-widget-group__inner-blocks">
          <p class="wp-block-tag-cloud">
            <a
              href=""
              class="tag-cloud-link tag-link-10 tag-link-position-3"
              style="font-size: 8pt"
              >时尚</a
            >
            <a
              href=""
              class="tag-cloud-link tag-link-12 tag-link-position-5"
              style="font-size: 8pt"
              >新闻</a
            >
            <a
              href=""
              class="tag-cloud-link tag-link-13 tag-link-position-6"
              style="font-size: 8pt"
              >运动</a
            >
            <a
              href=""
              class="tag-cloud-link tag-link-14 tag-link-position-7"
              style="font-size: 8pt"
              >旅行</a
            >
          </p>
        </div>
      </div>
      <!--功能-->
      <div
        id="meta-1"
        class="bloglo-sidebar-widget bloglo-widget bloglo-entry widget widget_meta"
      >
        <div class="h4 widget-title">功能</div>
        <ul>
          <li><a href="登录页链接">登录</a></li>
          <li><a href="退出">退出</a></li>
          <li><a href="评论页链接">评论 </a></li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style scoped></style>
