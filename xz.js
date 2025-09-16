addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // 这里假设你已经在 Cloudflare 中设置了名为 'your-namespace' 的 KV 命名空间
  // 并且要获取键为 'key-in-kv' 的值
  const kvNamespace = 'your-namespace'; 
  const key = 'key-in-kv'; 

  // 使用 Workers KV API 获取值
  const value = await kv.get(kvNamespace, key); 

  // 将 KV 值传递给 HTML 页面
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>KV 值展示</title>
    </head>
    <body>
      <script>
        // 将获取到的 KV 值赋给 HTML 中的一个变量
        window.kvValue = '${value}';
      </script>
      <h1>KV 中 '${key}' 的值为: <span id="kvValueSpan"></span></h1>
      <script>
        // 在页面加载完成后，将变量的值显示在指定的 span 元素中
        document.addEventListener('DOMContentLoaded', () => {
          document.getElementById('kvValueSpan').textContent = window.kvValue;
        });
      </script>
    </body>
    </html>
  `;

  const headers = { 'Content-Type': 'text/html' };
  return new Response(html, { headers });
}