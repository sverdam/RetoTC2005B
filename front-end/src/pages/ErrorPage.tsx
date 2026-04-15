interface Props {}
const ErrorPage: React.FC<Props> = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="mt-4 text-xl text-gray-600">Página no encontrada</p>
            <p className="mt-2 text-gray-500"> La página que buscas no existe o ha sido movida</p>
            <a href="/" className="mt-6 inline-block bg-clas text-white px-6 py-2 rounded-lg hover:bg-clas-claro transition">Go back home</a>
        </div>
    );
};

export default ErrorPage;