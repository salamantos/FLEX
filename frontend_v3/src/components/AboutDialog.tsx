import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { AboutContent } from './AboutContent';

interface AboutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="bg-slate-900 border-slate-800 text-white max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-800 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-slate-500"
                style={{ scrollbarColor: '#475569 #1e293b', scrollbarWidth: 'thin', maxWidth: '50rem' }}
            >
                <DialogHeader>
                    <DialogTitle className="sr-only">About VALC</DialogTitle>
                    <DialogDescription>
                        <AboutContent />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

