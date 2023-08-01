import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { createRef, useState } from "react"


export const DebugAuthDialogWrapper = ({children}: {children:any}) => {
    const [open, setOpen] = useState(false)
    const accessTokenRef = createRef<HTMLInputElement>()
    const refreshTokenRef = createRef<HTMLInputElement>()
    const onSubmit = () => {
        if (accessTokenRef.current?.value === "" || refreshTokenRef.current?.value === "") {
            return
        }
        localStorage.setItem("accessToken", accessTokenRef.current?.value || "")
        localStorage.setItem("refreshToken", refreshTokenRef.current?.value || "")
        setOpen(false)
    }
    return (<>
        <div onClick={() => setOpen(true)}>{children}</div>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Debug auth</DialogTitle>
            <DialogContent>
                <TextField label="Access token" fullWidth inputRef={accessTokenRef} />
                <TextField label="Refresh token" fullWidth inputRef={refreshTokenRef} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onSubmit}>Set tokens</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}