import React from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FormActionsProps {
    isSubmitting: boolean
}

export const FormActions: React.FC<FormActionsProps> = ({ isSubmitting }) => {
    return (
        <div className="flex justify-end space-x-4">
            <Button type='button' variant={"outline"}>
                cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Submitting...
                    </>
                ) : (
                    <>
                        <Upload className="w-4 h-4 mr-2" />
                        Submit Project
                    </>
                )}
            </Button>
        </div>
    )
}
