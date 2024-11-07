export const LoadingMovie = ({message}) => {
    return (
        <div className="absolute min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-300 dark:text-gray-300">{message}</p>
            </div>
        </div>
    )
}