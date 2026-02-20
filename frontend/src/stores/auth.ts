import { create } from "zustand"
import { persist } from "zustand/middleware"
import { apolloClient } from "@/lib/graphql/apollo"
import type { User ,RegisterInput, LoginInput} from '@/types'
import { REGISTER } from '@/lib/graphql/mutations/Register'
import { LOGIN } from '../lib/graphql/mutations/Login'
import { UPDATE_PROFILE } from '@/lib/graphql/mutations/UpdateProfile'

type RegisterMutationData = {
  register: {
    token: string
    refreshToken: string
    user: User
  }
}

type LoginMutationData = {
  login: {
    token: string
    refreshToken: string
    user: User
  }
}

type UpdateProfileMutationData = {
  updateProfile: User
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  signup: (data: RegisterInput) => Promise<boolean>
  login: (data: LoginInput) => Promise<boolean>
  logout: () => void
  updateProfile: (name: string) => Promise<boolean>
}

export const useAuthStore = create<AuthState>() (
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        login: async (loginData: LoginInput) => {
          try{
              const {data} = await apolloClient.mutate<LoginMutationData, { data: LoginInput }>({
                mutation: LOGIN,
                variables: {
                  data: {
                    email: loginData.email,
                    password: loginData.password
                  }
                }
              })

              if(data?.login){
                const { user, token } = data.login
                set({
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                  },
                  token,
                  isAuthenticated: true
                })
                return true
              }
              return false
          }catch(error){
            console.log("Erro ao fazer o login")
            throw error
          }
        },
        signup: async (registerData: RegisterInput) => {
          try{
              const { data } = await apolloClient.mutate<
              RegisterMutationData,
                {data: RegisterInput}
              >({
                mutation: REGISTER,
                variables: {
                  data: {
                      name: registerData.name,
                      email: registerData.email,
                      password: registerData.password
                  }
                }
              })
              if(data?.register){
                const { token, user } = data.register
                set({
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                  },
                  token,
                  isAuthenticated: true
                })
                return true
              }
              return false
          }catch(error){
            console.log("Erro ao fazer o cadastro")
            throw error
          }
        },
        logout: () => {
          set({
            user:null,
            token: null,
            isAuthenticated: false
          })
          apolloClient.clearStore()
        },
        updateProfile: async (name: string) => {
          try {
            const { data } = await apolloClient.mutate<
              UpdateProfileMutationData,
              { data: { name: string } }
            >({
              mutation: UPDATE_PROFILE,
              variables: { data: { name } },
            })
            if (data?.updateProfile) {
              const user = data.updateProfile
              set({
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  createdAt: user.createdAt,
                  updatedAt: user.updatedAt,
                },
              })
              return true
            }
            return false
          } catch (error) {
            console.error("Error updating profile", error)
            throw error
          }
        },
      }),
      {
        name: 'auth-storage'
      }
    )
)
