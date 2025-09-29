'use client';

import { Plus, Trash2 } from 'lucide-react';
import { Controller, FormProvider } from 'react-hook-form';

import { useEditProfile } from '@/entities/contact';
import { FormField, MonthPicker, ProfileHeader } from '@/entities/contact';

import { ProfileImageUploader } from '@/shared/ui';

import { Button, Input, Switch, Tabs, TabsContent, TabsList, TabsTrigger, Textarea } from '@/shadcn/components/ui';
import { formatPhoneNumber } from '@/shared';
import { useEffect, useState } from "react";

interface ProfileEditProps {
  contact: Contact.Contact | undefined;
}

export const ProfileEdit = ({ contact }: ProfileEditProps) => {
  const {
    methods,
    isPending,
    careerFields, // 'fields' -> 'careerFields'로 이름 변경
    addCareer,
    removeCareer,
    socialLinkFields, // socialLinks 필드 배열
    addSocialLink, // socialLinks 추가 함수
    removeSocialLink, // socialLinks 삭제 함수
    handleFormSubmit,
  } = useEditProfile(contact);
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = methods;

  const phoneNumberValue = watch('phoneNumber');
  const [activeTab, setActiveTab] = useState('basic');
  useEffect(() => {
    if (errors.phoneNumber) {
      setActiveTab('basic');
    }
  }, [errors]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit} className="flex w-full flex-col gap-8">
        {contact && <ProfileHeader contact={contact} />}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex w-full justify-start overflow-x-auto whitespace-nowrap">
            <TabsTrigger value="basic">기본설정</TabsTrigger>
            <TabsTrigger value="intro">사용자 소개</TabsTrigger>
            <TabsTrigger value="social">소셜 네트워크</TabsTrigger>
            <TabsTrigger value="privacy">공개범위</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="flex h-[30rem] flex-col gap-8 rounded-md border bg-white p-6">
              <FormField label="프로필">
                <ProfileImageUploader
                  name="profileImage"
                  setValue={methods.setValue}
                  defaultValue={contact?.profileImageUrl}
                />
              </FormField>
              <FormField label="이메일">
                <Input placeholder="이메일" {...register('email')} disabled />
              </FormField>
              <FormField label="연락처">
                <div>
                  <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <Input
                        id="연락처"
                        placeholder="010-1234-5678"
                        onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                        value={field.value ?? ''}
                      />
                    )}
                  />
                  <p className="mt-2 text-xs text-gray-500">연락처 정보는 공개범위 내 사용자만 볼 수 있습니다.</p>
                  {phoneNumberValue === '전화번호 없음' && (
                    <p className="mt-1 text-xs text-red-500">
                      올바른 전화번호를 입력하지 않을 시 동문수첩 정보 수정이 불가합니다.
                    </p>
                  )}
                  {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber.message}</p>}
                </div>
              </FormField>
            </div>
          </TabsContent>
          <TabsContent value="intro">
            <div className="flex h-[30rem] flex-col gap-6 overflow-y-auto rounded-md border bg-white p-6">
              <FormField label="한줄 소개">
                <Textarea placeholder="한줄 소개를 입력해주세요" {...register('description')} />
              </FormField>
              <FormField label="직업/직군">
                <Input placeholder="직업/직군" {...register('job')} />
              </FormField>
              <div className="flex flex-col gap-4">
                <label className="text-sm font-medium">이력</label>
                {careerFields.map((field, index) => (
                  <div key={field.id} className="flex flex-col gap-2 rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">이력 {index + 1}</p>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeCareer(index)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Controller
                        control={control}
                        name={`userCareer.${index}.periodStart`}
                        render={({ field }) => (
                          <MonthPicker value={field.value ?? ''} onChange={field.onChange} placeholder="시작일" />
                        )}
                      />
                      <span>~</span>
                      <Controller
                        control={control}
                        name={`userCareer.${index}.periodEnd`}
                        render={({ field }) => (
                          <MonthPicker value={field.value ?? ''} onChange={field.onChange} placeholder="종료일" />
                        )}
                      />
                    </div>
                    <Textarea
                      {...register(`userCareer.${index}.description`)}
                      placeholder="회사명 및 주요업무, 재직중일 경우 (재직중)으로 작성해주세요"
                    />
                    {errors.userCareer?.[index]?.description?.message && (
                      <p className="mt-1 text-sm font-medium text-red-500">
                        {errors.userCareer[index]?.description?.message}
                      </p>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" className="w-full" onClick={addCareer}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="social">
            <div className="flex h-[30rem] flex-col gap-4 overflow-y-auto rounded-md border bg-white p-6">
              {socialLinkFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <div className="flex-grow">
                    <FormField label={`링크 ${index + 1}`}>
                      <Input
                        placeholder="https:// 전체 주소를 입력해주세요"
                        {...register(`socialLinks.${index}.value` as const)}
                      />
                      {errors.socialLinks?.[index]?.value && (
                        <p className="mt-1 text-sm font-medium text-red-500">
                          {errors.socialLinks[index]?.value?.message}
                        </p>
                      )}
                    </FormField>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-6 shrink-0"
                    onClick={() => removeSocialLink(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
              {socialLinkFields.length < 10 ? (
                <Button type="button" variant="outline" className="w-full" onClick={() => addSocialLink()}>
                  <Plus className="mr-2 h-4 w-4" />
                  링크 추가하기
                </Button>
              ) : (
                <p className="pt-2 text-center text-sm text-gray-500">소셜 링크는 최대 10개까지 추가할 수 있습니다.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="privacy">
            <div className="flex h-[30rem] flex-col gap-6 rounded-md border bg-white p-6">
              <FormField label="연락처 비공개" hint="비공개 시 다른 사용자에게 연락처가 보이지 않습니다.">
                <Controller
                  control={control}
                  name="isPhoneNumberVisible"
                  render={({ field }) => <Switch checked={field.value ?? false} onCheckedChange={field.onChange} />}
                />
              </FormField>
            </div>
          </TabsContent>
        </Tabs>

        <div className="w-full">
          <Button type="submit" className="w-full" disabled={isPending}>
            저장하기
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
