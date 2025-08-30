import { atomWithStorage } from 'jotai/utils'
import type BloodSample from 'types/BloodSample'

interface TestsDataStore {
  [id: string]: BloodSample
}

export default atomWithStorage<TestsDataStore>('testsData', {}, undefined, {
  getOnInit: true,
})
