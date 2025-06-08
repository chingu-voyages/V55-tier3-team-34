"use client"
import React from "react";
import {Button} from "@/components/ui/button";


export default function ErrorPage({
                                      error,
                                      reset,
                                  }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex items-start mt-12 justify-center px-4 ">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900 mb-2">
                        Something went wrong
                    </h1>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                        We encountered an unexpected error. Our team has been notified and is working to resolve this issue.
                    </p>
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mb-6 p-3 bg-gray-50 rounded border text-left">
                            <p className="text-xs text-gray-500 font-mono break-all">
                                {error.digest && `Digest: ${error.digest}`}
                                {error.digest && error.message && ' • '}
                                {error.message}
                            </p>
                        </div>
                    )}
                    <div className="space-y-3">
                        <Button
                            onClick={reset}
                            className="w-full bg-primary  text-white font-medium  rounded-md transition-colors duration-200"
                        >
                            Try again
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => window.location.href = '/'}
                            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium  rounded-md transition-colors duration-200"
                        >
                            Go to homepage
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
