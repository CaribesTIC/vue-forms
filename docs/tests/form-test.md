# Testeando Form

## `taskForm.spec.ts`

```ts
import { mount } from '@vue/test-utils'
import AppInput from '@/components/AppInput.vue'
import AppSelect from '@/components/AppSelect.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'
import AppRadio from '@/components/AppRadio.vue'
import AppRadioGroup from '@/components/AppRadioGroup.vue'
import AppTextarea from '@/components/AppTextarea.vue'
import TasksForm from '@/components/TasksForm.vue'

describe('TasksForm', () => {
  it('should be initialized blank all and no title', async () => {
    const wrapper = mount(TasksForm,{
      global: {
        components: {
          AppInput,
          AppSelect,
          AppCheckbox,
          AppRadio,
          AppRadioGroup,
          AppTextarea
        }
      },
      props:{
        task: {
          frequency: '',
          name: '',
          description: '',    
          situation: 0,
          supervision: {
            reviewed: false,
            approved: false
          }
        },
        frequencies: [
          'annual',
          'biannual',
          'biweekly',
          'daily',
          'eventual',
          'monthly',
          'quarterly',
          'weekly'
        ]
      }
    })
 
    await wrapper.find('select').setValue('daily')
    await wrapper.find('input[type=text]').setValue('My task')
    await wrapper.find('textarea').setValue('Lorem ipsum dolor sit amet...')
    await wrapper.find('input[type=radio][value="1"]').setValue()
    await wrapper.findAll('input[type=checkbox]')[0].setValue() 

    await wrapper.find('button').trigger('submit')

    expect(wrapper.emitted('sendForm')[0][0]).toEqual({
      frequency: 'daily',
      name: 'My task',
      description: 'Lorem ipsum dolor sit amet...',
      situation: 1,
      supervision: { reviewed: true, approved: false }
    })    
  })
})
```
