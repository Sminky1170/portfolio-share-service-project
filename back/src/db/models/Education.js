// import { EducationModel } from "../schemas/education";

// // Education 클래스
// class Education {
//     // 새로운 교육 정보를 생성하는 메서드
//     static async create({ user_id, newEducation }) {
//     // user_id에 해당하는 사용자를 찾는다.
//     const user = await UserModel.findOne({ id: user_id });
//     // 사용자가 존재하지 않을 경우 예외 처리
//     if (!user) {
//     throw new Error(`id가 ${user_id}인 사용자가 존재하지 않습니다.`);
//     }
//     // 새로운 교육 정보를 생성한다.
//     const createdEducation = await EducationModel.create(newEducation);
//     // 사용자의 교육 정보 목록에 생성한 교육 정보를 추가하고 저장한다.
//     user.education.push(createdEducation);
//     await user.save();
//     // 생성한 교육 정보를 반환한다.
//     return createdEducation;
//     }
    
//     // 사용자의 모든 교육 정보를 조회하는 메서드
//     static async findByUser({ user_id }) {
//     // user_id에 해당하는 사용자를 조회하고, 교육 정보를 가져온다.
//     const user = await UserModel.findOne({ id: user_id }).populate("education");
//     return user.education;
//     }
    
//     // 교육 정보 id에 해당하는 교육 정보를 조회하는 메서드
//     static async findById({ education_id }) {
//     const education = await EducationModel.findOne({ id: education_id });
//     return education;
//     }
    
//     // 교육 정보 id에 해당하는 교육 정보를 업데이트하는 메서드
//     static async update({ education_id, fieldToUpdate, newValue }) {
//     // id가 education_id인 교육 정보를 찾는다.
//     const filter = { id: education_id };
//     // 업데이트할 필드와 값으로 update 객체를 만든다.
//     const update = { [fieldToUpdate]: newValue };
//     // 업데이트된 교육 정보를 반환하기 위해 returnOriginal: false 옵션을 사용한다.
//     const option = { returnOriginal: false };
    
//     // 교육 정보를 업데이트하고, 업데이트된 교육 정보를 반환한다.
//     const updatedEducation = await EducationModel.findOneAndUpdate(
//       filter,
//       update,
//       option
//     );
//     return updatedEducation;
//     }
    
//     // 교육 정보 id에 해당하는 교육 정보를 삭제하는 메서드
//     static async delete({ education_id }) {
//     // id가 education_id인 교육 정보를 찾아서 삭제하고, 삭제한 교육 정보를 반환한다.
//     const deletedEducation = await EducationModel.findOneAndDelete({ id: education_id });
//     return deletedEducation;
//     }
//     }
    
//     export { Education };