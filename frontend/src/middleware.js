import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Intercepta rotas que começam com /api-backend
  if (pathname.startsWith('/api-backend')) {
    
    // Pega a URL correta (que vimos no log que está certa: http://my-backend:3000)
    // Se falhar, usa localhost (mas não deve falhar mais)
    const backendBaseUrl = process.env.API_URL || 'http://localhost:3001'
    console.log("BackendBaseUrl: ",backendBaseUrl)

    // Remove o prefixo '/api-backend' para mandar a rota limpa pro backend
    // Ex: /api-backend/products vira /products
    const newPath = pathname.replace(/^\/api-backend/, '');
    
    // Mantém os parâmetros de busca (?id=1&filter=abc)
    const searchParams = request.nextUrl.search;

    // Monta a URL final de destino
    const targetUrl = `${backendBaseUrl}${newPath}${searchParams}`;

    console.log(`🔀 [Middleware] Redirecionando: ${pathname} -> ${targetUrl}`);

    // Realiza o Rewrite (O navegador não vê a URL mudar, mas o servidor busca no backend)
    return NextResponse.rewrite(new URL(targetUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api-backend/:path*',
};