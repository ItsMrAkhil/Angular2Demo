import {FormControl} from '@angular/forms'

export class PostValidators{
    static minTitleLength(formControl: FormControl){
        if(formControl.value.length < 6)
            return {
                minTitleLength: {
                    requiredLength: 6, 
                    currentLength: formControl.value.length
                }
            };
        return null;
    }
    
    static minImageLength(formControl: FormControl){
        if(formControl.value.length < 10)
            return {
                minImageLength: {
                    requiredLength: 10, 
                    currentLength: formControl.value.length
                }
            };
        return null;
    }
    static minPostLength(formControl: FormControl){
        if(formControl.value.length < 20)
            return {
                minPostLength: {
                    requiredLength: 20, 
                    currentLength: formControl.value.length
                }
            };
        return null;
    }
    static validImage(formControl: FormControl){
        if(formControl.value.match(/\.(jpeg|jpg|gif|png)$/) == null)
            return {validImage: false}
        return null
    }
}